pipeline {
  agent any

  environment {
    REGISTRY_USR = ""
    REGISTRY_PSW = ""
    IMAGE_NAME = "cloud-login-demo"
    IMAGE_TAG  = "latest"
  }

  stages {
    stage('Build Docker Image') {
      steps {
        sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
      }
    }

    stage('Deploy App') {
      steps {
        sh """
          docker stop cloud-login || true
          docker run -d -p 5000:5000 --name cloud-login --rm ${IMAGE_NAME}:${IMAGE_TAG}
        """
      }
    }
  }
}
