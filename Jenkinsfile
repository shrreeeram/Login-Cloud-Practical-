pipeline {
  agent any

  environment {
    REGISTRY = credentials('docker-registry') // set in Jenkins
    IMAGE_NAME = "cloud-login-demo"
    IMAGE_TAG = "latest"
  }

  stages {
    stage('Checking') {
      steps {
        checkout scm
        sh 'npm install'
        sh 'npm run lint || echo "no lint script configured"'
      }
    }

    stage('Build') {
      steps {
        sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Deploy') {
      steps {
        // Push if registry creds present, then run
        sh """
          if [ -n "$REGISTRY_USR" ]; then
            echo "$REGISTRY_PSW" | docker login -u "$REGISTRY_USR" --password-stdin
            docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${REGISTRY_USR}/${IMAGE_NAME}:${IMAGE_TAG}
            docker push ${REGISTRY_USR}/${IMAGE_NAME}:${IMAGE_TAG}
          fi
          docker stop cloud-login || true
          docker run -d -p 5000:5000 --name cloud-login --rm ${REGISTRY_USR:+$REGISTRY_USR/}${IMAGE_NAME}:${IMAGE_TAG}
        """
      }
    }
  }
}

