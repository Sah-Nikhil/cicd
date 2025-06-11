// Jenkinsfile - Corrected to merge Feature Branch into Main
pipeline {
    agent any

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: '', description: 'The branch to check for conflicts (e.g., feature/my-branch)')
    }

    stages {
        stage('Prepare Workspace') {
            steps {
                script {
                    // Clean workspace thoroughly before anything
                    sh 'git clean -fdx || true' // Clean, ignore errors if nothing to clean
                    sh 'git config --global user.email "jenkins@example.com"'
                    sh 'git config --global user.name "Jenkins Automation"'
                }
            }
        }

        stage('Checkout Main Branch') {
            steps {
                script {
                    checkout scm: [
                        $class: 'GitSCM',
                        branches: [[name: 'main']], // Checkout 'main' branch
                        userRemoteConfigs: [[url: 'https://github.com/Sah-Nikhil/cicd.git', credentialsId: 'github-pat-for-ci']],
                        extensions: [[$class: 'WipeWorkspace']] // Ensure clean checkout for main
                    ]
                    echo "Checked out main branch."
                }
            }
        }

        stage('Fetch Feature Branch') {
            steps {
                script {
                    // Fetch the feature branch without checking it out directly into the workspace
                    // We only need to fetch it to have it locally for the merge operation
                    sh "git fetch origin ${params.BRANCH_NAME}:${params.BRANCH_NAME}"
                    echo "Fetched feature branch: ${params.BRANCH_NAME}"
                }
            }
        }

        stage('Attempt Merge Feature Branch into Main') {
            steps {
                script {
                    def hasConflicts = false
                    try {
                        // Ensure we are on 'main' branch for the merge operation
                        sh "git checkout main"

                        // Attempt to merge the feature branch (e.g., 'test') into 'main'
                        // Use 'origin/${params.BRANCH_NAME}' to refer to the fetched remote branch
                        def mergeStatus = sh script: "git merge origin/${params.BRANCH_NAME} --no-commit --no-ff", returnStatus: true

                        if (mergeStatus == 0) {
                            // Merge command exited with 0 (success or already up-to-date)
                            // Now check for actual unmerged paths (conflicts)
                            def statusOutput = sh(script: "git status --porcelain", returnStdout: true).trim()

                            if (statusOutput.contains('U ') || statusOutput.contains('AA ')) {
                                hasConflicts = true
                                echo "CONFLICTS DETECTED: Unmerged paths found when merging ${params.BRANCH_NAME} into main."
                                currentBuild.result = 'FAILURE'
                            } else {
                                echo "No conflicts detected: ${params.BRANCH_NAME} can be cleanly merged into main (or is already merged)."
                                currentBuild.result = 'SUCCESS'
                            }
                        } else if (mergeStatus == 1) {
                            // Merge command exited with 1 (typical for unresolved conflicts)
                            hasConflicts = true
                            echo "CONFLICTS DETECTED: Git merge returned 1 for ${params.BRANCH_NAME} into main."
                            currentBuild.result = 'FAILURE'
                        } else {
                            // Other unexpected exit code from git merge
                            echo "UNEXPECTED MERGE ERROR: Git merge returned ${mergeStatus} for ${params.BRANCH_NAME} into main."
                            currentBuild.result = 'FAILURE'
                        }
                    } catch (Exception e) {
                        echo "FATAL ERROR during merge attempt: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                    } finally {
                        // Always abort the merge and clean the workspace, regardless of success or failure
                        // This ensures the workspace is clean for the next build.
                        try {
                            sh "git merge --abort || true" // Abort if merge in progress, || true to prevent script failure
                            sh "git reset --hard HEAD || true" // Reset local changes, || true to prevent script failure
                            sh "git clean -fdx || true" // Clean untracked files/dirs
                        } catch (Exception cleanupError) {
                            echo "Cleanup failed: ${cleanupError.getMessage()}"
                        }
                    }
                }
            }
        }
    }
}   
