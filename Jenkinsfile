// Jenkinsfile
pipeline {
    agent any

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: '', description: 'The branch to check for conflicts')
    }

    stages {
        stage('Prepare Workspace') {
            steps {
                script {
                    sh 'rm -rf *' // This line can be dangerous if not careful, consider 'git clean -fdx' instead
                    sh 'git config --global user.email "jenkins@example.com"'
                    sh 'git config --global user.name "Jenkins Automation"'
                }
            }
        }

        stage('Checkout Main') {
            steps {
                script {
                    checkout scm: [
                        $class: 'GitSCM',
                        branches: [[name: 'main']],
                        // --- IMPORTANT CHANGE HERE ---
                        // Use your GitHub repository URL directly, and specify the credentialsId
                        userRemoteConfigs: [[url: 'https://github.com/Sah-Nikhil/cicd.git', credentialsId: 'github-pat-for-ci']],
                        // Make sure 'github-pat-for-ci' is the actual ID of your credential in Jenkins
                        // --- END IMPORTANT CHANGE ---
                        extensions: [[$class: 'WipeWorkspace']]
                    ]
                }
            }
        }

        stage('Checkout Feature Branch') {
            steps {
                script {
                    // This part should work after main is checked out correctly
                    // No need to specify credentials here as we're operating within the same repo
                    sh "git fetch origin ${params.BRANCH_NAME}:${params.BRANCH_NAME}"
                    sh "git checkout ${params.BRANCH_NAME}"
                }
            }
        }

        stage('Attempt Merge and Detect Conflicts') {
            steps {
                script {
                    try {
                        sh "git merge origin/main --no-commit --no-ff"
                        sh "git merge --abort"
                        currentBuild.result = 'SUCCESS'
                        echo "No conflicts detected with main."
                    } catch (Exception e) {
                        sh "git merge --abort"
                        currentBuild.result = 'FAILURE'
                        echo "CONFLICTS DETECTED with main."
                    }
                }
            }
        }
    }
}
