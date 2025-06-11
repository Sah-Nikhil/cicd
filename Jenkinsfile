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
                    // Clean workspace
                    sh 'rm -rf *'
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
                        userRemoteConfigs: [[url: env.GIT_URL_1]],
                        extensions: [[$class: 'WipeWorkspace']]
                    ]
                }
            }
        }

        stage('Checkout Feature Branch') {
            steps {
                script {
                    sh "git fetch origin ${params.BRANCH_NAME}:${params.BRANCH_NAME}"
                    sh "git checkout ${params.BRANCH_NAME}"
                }
            }
        }

        stage('Attempt Merge and Detect Conflicts') {
            steps {
                script {
                    try {
                        // Try to merge main into the feature branch without committing
                        sh "git merge origin/main --no-commit --no-ff"
                        // If merge succeeds without immediate conflicts, clean up and succeed
                        sh "git merge --abort"
                        currentBuild.result = 'SUCCESS'
                        echo "No conflicts detected with main."
                    } catch (Exception e) {
                        // If merge fails, it's likely a conflict
                        sh "git merge --abort" // Abort the merge attempt
                        currentBuild.result = 'FAILURE' // Mark build as failure
                        echo "CONFLICTS DETECTED with main."
                        // You might want to capture diffs here for AI analysis
                        // For simplicity, we'll let n8n fetch diffs from GitHub
                    }
                }
            }
        }
    }
}
