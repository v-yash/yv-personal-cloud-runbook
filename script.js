// ============================================================
//  Cloud Runbook — Commands Database (250+ commands)
// ============================================================

const commands = [
  // ====================== KUBERNETES (25) ======================
  { id: "k8s-get-pods-all", category: "Kubernetes", title: "Get all pods across namespaces", description: "Lists all pods across all namespaces in the cluster.", command: "kubectl get pods --all-namespaces", tags: ["pods", "overview"] },
  { id: "k8s-events-sort", category: "Kubernetes", title: "Sort events by timestamp", description: "Get recent events in a namespace sorted by their creation time.", command: "kubectl get events --sort-by='.metadata.creationTimestamp'", tags: ["events", "debugging", "cluster"] },
  { id: "k8s-top-nodes", category: "Kubernetes", title: "Check node resource usage", description: "Displays CPU and Memory usage for all nodes.", command: "kubectl top nodes", tags: ["metrics", "nodes", "performance"] },
  { id: "k8s-force-delete-pod", category: "Kubernetes", title: "Force delete a stuck pod", description: "Bypasses graceful termination to kill a pod.", command: "kubectl delete pod <pod-name> --grace-period=0 --force", tags: ["pods", "stuck", "delete"] },
  { id: "k8s-port-forward", category: "Kubernetes", title: "Port forward to a service", description: "Forwards local port to a service port.", command: "kubectl port-forward svc/<service-name> 8080:80", tags: ["network", "debug"] },
  { id: "k8s-decode-secret", category: "Kubernetes", title: "Decode a base64 secret", description: "Fetches and decodes a base64 Kubernetes secret.", command: "kubectl get secret <secret-name> -o jsonpath='{.data.<key>}' | base64 --decode", tags: ["security", "secrets", "base64"] },
  { id: "k8s-logs-previous", category: "Kubernetes", title: "Get logs from previously crashed pod", description: "Useful for checking why a pod crashed before it restarted.", command: "kubectl logs <pod-name> --previous", tags: ["logs", "crash", "debug"] },
  { id: "k8s-auth-can-i", category: "Kubernetes", title: "Check RBAC permissions", description: "Check if your current user has permission to perform an action.", command: "kubectl auth can-i create deployments --namespace dev", tags: ["rbac", "auth", "permissions"] },
  { id: "k8s-dry-run", category: "Kubernetes", title: "Generate YAML manifest (dry run)", description: "Generates the YAML for a resource without actually creating it.", command: "kubectl create deployment nginx --image=nginx --dry-run=client -o yaml > nginx.yaml", tags: ["yaml", "manifest", "generate"] },
  { id: "k8s-drain-node", category: "Kubernetes", title: "Safely drain a node", description: "Evicts all pods from a node safely before maintenance.", command: "kubectl drain <node-name> --ignore-daemonsets --delete-emptydir-data", tags: ["node", "maintenance", "drain"] },
  { id: "k8s-exec-sh", category: "Kubernetes", title: "Interactive shell in pod", description: "Opens an interactive shell session inside a running pod.", command: "kubectl exec -it <pod-name> -- /bin/sh", tags: ["exec", "shell", "interactive"] },
  { id: "k8s-restart-deployment", category: "Kubernetes", title: "Restart a deployment", description: "Triggers a rolling restart of all pods in a deployment.", command: "kubectl rollout restart deployment/<deployment-name>", tags: ["rollout", "restart", "deployment"] },
  { id: "k8s-scale", category: "Kubernetes", title: "Scale deployment", description: "Instantly scales the number of replicas for a resource.", command: "kubectl scale deployment/<deployment-name> --replicas=5", tags: ["scale", "replicas", "capacity"] },
  { id: "k8s-set-image", category: "Kubernetes", title: "Update image in deployment", description: "Updates the container image of a deployment without editing YAML.", command: "kubectl set image deployment/my-app my-app=my-image:v2.0", tags: ["image", "update", "deploy"] },
  { id: "k8s-explain", category: "Kubernetes", title: "Explain K8s API resource", description: "Shows the documentation and fields for a specific Kubernetes resource.", command: "kubectl explain pod.spec.containers", tags: ["explain", "docs", "api"] },
  { id: "k8s-rollout-history", category: "Kubernetes", title: "View rollout history", description: "Checks the revision history of a deployment.", command: "kubectl rollout history deployment/<name>", tags: ["rollout", "history"] },
  { id: "k8s-get-yaml", category: "Kubernetes", title: "Get running pod YAML", description: "Exports the live YAML configuration of a running pod.", command: "kubectl get pod <pod-name> -o yaml", tags: ["yaml", "export"] },
  { id: "k8s-patch", category: "Kubernetes", title: "Patch resource inline", description: "Updates a field on a resource without an editor.", command: `kubectl patch deployment <name> -p '{"spec": {"replicas": 3}}'`, tags: ["patch", "update"] },
  { id: "k8s-label-nodes", category: "Kubernetes", title: "Label a node", description: "Adds or updates a label on a Kubernetes node for scheduling.", command: "kubectl label node <node-name> env=production", tags: ["label", "node", "scheduling"] },
  { id: "k8s-taint-node", category: "Kubernetes", title: "Taint a node", description: "Adds a taint to a node to repel pods that don't tolerate it.", command: "kubectl taint nodes <node-name> key=value:NoSchedule", tags: ["taint", "scheduling"] },
  { id: "k8s-configmap-create", category: "Kubernetes", title: "Create ConfigMap from file", description: "Creates a ConfigMap from a local file.", command: "kubectl create configmap my-config --from-file=config.properties", tags: ["configmap", "config"] },
  { id: "k8s-rollout-undo", category: "Kubernetes", title: "Rollback a deployment", description: "Rolls back a deployment to the previous revision.", command: "kubectl rollout undo deployment/<deployment-name>", tags: ["rollback", "undo", "deployment"] },
  { id: "k8s-get-contexts", category: "Kubernetes", title: "List all kube contexts", description: "Shows all available contexts in your kubeconfig.", command: "kubectl config get-contexts", tags: ["context", "config", "cluster"] },
  { id: "k8s-switch-context", category: "Kubernetes", title: "Switch kube context", description: "Changes the active Kubernetes context.", command: "kubectl config use-context <context-name>", tags: ["context", "switch"] },
  { id: "k8s-top-pods", category: "Kubernetes", title: "Top pods by CPU", description: "Shows CPU and memory usage of pods sorted by CPU.", command: "kubectl top pods --sort-by=cpu --all-namespaces", tags: ["metrics", "cpu", "pods"] },

  // ====================== HELM (10) ======================
  { id: "helm-list-all", category: "Helm", title: "List all releases across namespaces", description: "Lists all Helm deployments in the cluster.", command: "helm ls --all-namespaces", tags: ["helm", "deployments"] },
  { id: "helm-rollback", category: "Helm", title: "Rollback a release", description: "Rolls back a Helm deployment to a specific prior revision.", command: "helm rollback <release-name> <revision-number>", tags: ["helm", "rollback", "revert"] },
  { id: "helm-get-values", category: "Helm", title: "Get deployed values", description: "Fetches the values.yaml that was actually applied to a deployed release.", command: "helm get values <release-name>", tags: ["helm", "config", "values"] },
  { id: "helm-upgrade-install", category: "Helm", title: "Upgrade or install release", description: "Installs a helm chart, or upgrades it if it already exists.", command: "helm upgrade --install <release-name> <chart-path>", tags: ["helm", "deploy", "upgrade"] },
  { id: "helm-template", category: "Helm", title: "Render Helm templates locally", description: "Renders the chart templates locally without applying them to the cluster.", command: "helm template <release-name> <chart-path>", tags: ["helm", "template", "dry-run"] },
  { id: "helm-repo-add", category: "Helm", title: "Add Helm repo", description: "Adds a chart repository to Helm's local repo list.", command: "helm repo add bitnami https://charts.bitnami.com/bitnami && helm repo update", tags: ["helm", "repo", "add"] },
  { id: "helm-show-values", category: "Helm", title: "Show chart default values", description: "Prints the default values.yaml of a chart before installing.", command: "helm show values <chart-name>", tags: ["helm", "values", "chart"] },
  { id: "helm-history", category: "Helm", title: "View release history", description: "Shows the revision history and status of a Helm release.", command: "helm history <release-name>", tags: ["helm", "history", "revisions"] },
  { id: "helm-uninstall", category: "Helm", title: "Uninstall a release", description: "Removes all resources associated with a Helm release.", command: "helm uninstall <release-name> --namespace <ns>", tags: ["helm", "delete", "cleanup"] },
  { id: "helm-lint", category: "Helm", title: "Lint a Helm chart", description: "Validates a chart for possible issues before deploying.", command: "helm lint ./my-chart", tags: ["helm", "lint", "validate"] },

  // ====================== KARPENTER (6) ======================
  { id: "karpenter-logs", category: "Karpenter", title: "View controller logs", description: "Tails the logs of the Karpenter controller pod.", command: "kubectl logs -f -n karpenter -l app.kubernetes.io/name=karpenter", tags: ["logs", "debugging"] },
  { id: "karpenter-nodeclaims", category: "Karpenter", title: "List NodeClaims", description: "Shows all NodeClaims provisioned by Karpenter.", command: "kubectl get nodeclaims", tags: ["nodes", "claims"] },
  { id: "karpenter-disrupt-logs", category: "Karpenter", title: "View disruption logs", description: "Filters Karpenter logs specifically for scale-down and disruption events.", command: "kubectl logs -n karpenter -l app.kubernetes.io/name=karpenter | grep -i disrupt", tags: ["scaling", "disruption", "logs"] },
  { id: "karpenter-nodepools", category: "Karpenter", title: "List NodePools", description: "Shows all Karpenter NodePool configurations.", command: "kubectl get nodepools", tags: ["nodepool", "config"] },
  { id: "karpenter-describe-nodeclaim", category: "Karpenter", title: "Describe a NodeClaim", description: "Shows detailed info about a specific NodeClaim including instance type.", command: "kubectl describe nodeclaim <name>", tags: ["describe", "instance"] },
  { id: "karpenter-ec2nodeclass", category: "Karpenter", title: "List EC2NodeClasses", description: "Shows all EC2NodeClass resources used by Karpenter for AWS configuration.", command: "kubectl get ec2nodeclasses", tags: ["aws", "nodeclass", "config"] },

  // ====================== AWS (25) ======================
  { id: "aws-s3-sync", category: "AWS", title: "Sync local folder to S3", description: "Uploads a local directory to an S3 bucket.", command: "aws s3 sync ./my-folder s3://my-bucket-name", tags: ["s3", "sync", "upload"] },
  { id: "aws-s3-empty-bucket", category: "AWS", title: "Force empty an S3 bucket", description: "Recursively deletes all objects in an S3 bucket.", command: "aws s3 rm s3://my-bucket-name --recursive", tags: ["s3", "delete"] },
  { id: "aws-ec2-describe", category: "AWS", title: "List running EC2 instances", description: "Returns the ID, Type, and State of running EC2s.", command: `aws ec2 describe-instances --filters "Name=instance-state-name,Values=running" --query "Reservations[*].Instances[*].[InstanceId,InstanceType,State.Name]" --output table`, tags: ["ec2", "inventory"] },
  { id: "aws-sts-caller", category: "AWS", title: "Check current AWS identity", description: "Verifies which AWS IAM user/role you are currently authenticated as.", command: "aws sts get-caller-identity", tags: ["iam", "auth", "sts"] },
  { id: "aws-eks-kubeconfig", category: "AWS", title: "Update EKS kubeconfig", description: "Generates or updates kubeconfig for EKS.", command: "aws eks update-kubeconfig --region <region> --name <cluster-name>", tags: ["eks", "kubernetes", "auth"] },
  { id: "aws-sso-login", category: "AWS", title: "Login via AWS SSO", description: "Authenticates via AWS IAM Identity Center (SSO).", command: "aws sso login --profile <profile-name>", tags: ["sso", "auth", "login"] },
  { id: "aws-ecr-login", category: "AWS", title: "Docker login to ECR", description: "Gets a token and pipes it to docker login for AWS ECR.", command: "aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account_id>.dkr.ecr.<region>.amazonaws.com", tags: ["ecr", "docker", "auth"] },
  { id: "aws-cloudformation-drift", category: "AWS", title: "Detect CloudFormation drift", description: "Checks if actual resources have deviated from the CFN template.", command: "aws cloudformation detect-stack-drift --stack-name <stack-name>", tags: ["cloudformation", "drift", "iac"] },
  { id: "aws-s3-presigned", category: "AWS", title: "Generate S3 presigned URL", description: "Creates a temporary URL (valid for 1 hour) to securely share an S3 object.", command: "aws s3 presign s3://my-bucket/secret.pdf --expires-in 3600", tags: ["s3", "presigned", "share"] },
  { id: "aws-logs-tail", category: "AWS", title: "Tail CloudWatch Logs", description: "Streams real-time logs from an AWS CloudWatch Log Group.", command: "aws logs tail /aws/lambda/my-function --follow", tags: ["cloudwatch", "logs", "lambda"] },
  { id: "aws-secrets-get", category: "AWS", title: "Get AWS secret", description: "Fetches the plain text value of a secret from AWS Secrets Manager.", command: "aws secretsmanager get-secret-value --secret-id MySecret --query SecretString --output text", tags: ["secretsmanager", "security", "secrets"] },
  { id: "aws-iam-list-keys", category: "AWS", title: "List stale IAM access keys", description: "Lists all access keys for a user to identify old keys needing rotation.", command: "aws iam list-access-keys --user-name <username>", tags: ["iam", "keys", "security"] },
  { id: "aws-s3-cp", category: "AWS", title: "Copy file to S3", description: "Copies a single local file to an S3 bucket.", command: "aws s3 cp local-file.txt s3://my-bucket/", tags: ["s3", "copy"] },
  { id: "aws-lambda-invoke", category: "AWS", title: "Invoke Lambda function", description: "Synchronously invokes a Lambda function from the CLI.", command: "aws lambda invoke --function-name my-function --payload '{}' response.json", tags: ["lambda", "invoke"] },
  { id: "aws-rds-describe", category: "AWS", title: "List RDS instances", description: "Gets a list of all RDS database instances.", command: "aws rds describe-db-instances --query 'DBInstances[*].[DBInstanceIdentifier,DBInstanceStatus]'", tags: ["rds", "database"] },
  { id: "aws-ec2-stop", category: "AWS", title: "Stop EC2 instance", description: "Stops a running EC2 instance by instance ID.", command: "aws ec2 stop-instances --instance-ids i-1234567890abcdef0", tags: ["ec2", "stop"] },
  { id: "aws-ec2-start", category: "AWS", title: "Start EC2 instance", description: "Starts a stopped EC2 instance.", command: "aws ec2 start-instances --instance-ids i-1234567890abcdef0", tags: ["ec2", "start"] },
  { id: "aws-route53-list", category: "AWS", title: "List Route53 hosted zones", description: "Lists all DNS hosted zones in Route53.", command: "aws route53 list-hosted-zones --output table", tags: ["route53", "dns"] },
  { id: "aws-elb-describe", category: "AWS", title: "List load balancers", description: "Lists all Application and Network Load Balancers.", command: "aws elbv2 describe-load-balancers --query 'LoadBalancers[*].[LoadBalancerName,State.Code,DNSName]' --output table", tags: ["elb", "alb", "nlb"] },
  { id: "aws-ssm-start", category: "AWS", title: "Start SSM session", description: "Opens a shell session to an EC2 instance via Systems Manager (no SSH key needed).", command: "aws ssm start-session --target i-1234567890abcdef0", tags: ["ssm", "session", "shell"] },
  { id: "aws-cost-explorer", category: "AWS", title: "Get monthly cost breakdown", description: "Fetches cost and usage data grouped by service for the current month.", command: `aws ce get-cost-and-usage --time-period Start=$(date -d "$(date +%Y-%m-01)" +%Y-%m-%d),End=$(date +%Y-%m-%d) --granularity MONTHLY --metrics "BlendedCost" --group-by Type=DIMENSION,Key=SERVICE`, tags: ["cost", "billing", "finops"] },
  { id: "aws-ecr-list-images", category: "AWS", title: "List ECR images", description: "Lists all images in an ECR repository sorted by push date.", command: "aws ecr describe-images --repository-name <repo-name> --query 'sort_by(imageDetails,& imagePushedAt)[*].[imageTags[0],imagePushedAt]' --output table", tags: ["ecr", "images", "docker"] },
  { id: "aws-sqs-send", category: "AWS", title: "Send SQS message", description: "Sends a test message to an SQS queue.", command: `aws sqs send-message --queue-url <queue-url> --message-body '{"test": "hello"}'`, tags: ["sqs", "queue", "messaging"] },
  { id: "aws-dynamodb-scan", category: "AWS", title: "Scan DynamoDB table", description: "Scans all items from a DynamoDB table (use cautiously on large tables).", command: "aws dynamodb scan --table-name <table-name> --max-items 10", tags: ["dynamodb", "nosql", "scan"] },
  { id: "aws-cloudwatch-alarm", category: "AWS", title: "List CloudWatch alarms", description: "Shows all active CloudWatch alarms and their states.", command: "aws cloudwatch describe-alarms --state-value ALARM --output table", tags: ["cloudwatch", "alarms", "monitoring"] },

  // ====================== GCP (25) ======================
  { id: "gcp-auth-login", category: "GCP", title: "Authenticate with Google Cloud", description: "Authorizes the gcloud CLI to access Google Cloud Platform with your user credentials.", command: "gcloud auth login", tags: ["auth", "login"] },
  { id: "gcp-set-project", category: "GCP", title: "Set active GCP project", description: "Sets the default project ID for all subsequent gcloud commands.", command: "gcloud config set project <project-id>", tags: ["project", "config"] },
  { id: "gcp-gke-credentials", category: "GCP", title: "Get GKE cluster credentials", description: "Fetches cluster credentials for Google Kubernetes Engine and updates your local kubeconfig.", command: "gcloud container clusters get-credentials <cluster-name> --region <region>", tags: ["gke", "kubernetes"] },
  { id: "gcp-compute-instances", category: "GCP", title: "List GCE VM instances", description: "Lists all Google Compute Engine instances in the active project.", command: "gcloud compute instances list", tags: ["compute", "vms"] },
  { id: "gcp-compute-ssh", category: "GCP", title: "SSH into GCE instance", description: "Securely connects to a Compute Engine virtual machine via Identity-Aware Proxy (IAP).", command: "gcloud compute ssh <instance-name> --zone <zone> --tunnel-through-iap", tags: ["ssh", "iap", "compute"] },
  { id: "gcp-iam-policy", category: "GCP", title: "Get project IAM policy", description: "Fetches the complete IAM policy (roles and members) bound to the current project.", command: "gcloud projects get-iam-policy <project-id>", tags: ["iam", "security"] },
  { id: "gcp-gsutil-rsync", category: "GCP", title: "Sync local folder to GCS bucket", description: "Synchronizes the contents of a local directory to a Google Cloud Storage bucket.", command: "gsutil -m rsync -r ./my-folder gs://my-gcs-bucket", tags: ["storage", "gcs", "sync"] },
  { id: "gcp-gsutil-size", category: "GCP", title: "Calculate GCS bucket size", description: "Calculates the total size and number of objects in a Cloud Storage bucket.", command: "gsutil du -sh gs://my-gcs-bucket", tags: ["storage", "gcs", "size"] },
  { id: "gcp-bq-query", category: "GCP", title: "Run BigQuery SQL", description: "Executes a standard SQL query directly against BigQuery from the command line.", command: "bq query --use_legacy_sql=false 'SELECT * FROM `project.dataset.table` LIMIT 10'", tags: ["bigquery", "sql", "data"] },
  { id: "gcp-cloud-run-deploy", category: "GCP", title: "Deploy to Cloud Run", description: "Deploys a container image to Cloud Run as a fully managed serverless service.", command: "gcloud run deploy <service-name> --image <gcr.io/image-path> --region <region> --allow-unauthenticated", tags: ["serverless", "deploy", "cloud-run"] },
  { id: "gcp-secrets-access", category: "GCP", title: "Access Secret Manager value", description: "Retrieves the decoded payload of a secret stored in GCP Secret Manager.", command: `gcloud secrets versions access latest --secret="<secret-name>"`, tags: ["secrets", "security"] },
  { id: "gcp-pubsub-publish", category: "GCP", title: "Publish Pub/Sub message", description: "Publishes a test message to a Cloud Pub/Sub topic.", command: `gcloud pubsub topics publish <topic-name> --message="Hello World"`, tags: ["pubsub", "messaging"] },
  { id: "gcp-network-list", category: "GCP", title: "List VPC networks", description: "Lists all VPC networks and their subnet modes in the project.", command: "gcloud compute networks list", tags: ["vpc", "network"] },
  { id: "gcp-adc-login", category: "GCP", title: "Setup Application Default Credentials", description: "Authenticates your local environment so code can use GCP APIs natively.", command: "gcloud auth application-default login", tags: ["auth", "adc"] },
  { id: "gcp-run-services", category: "GCP", title: "List Cloud Run services", description: "Lists all deployed Cloud Run services in the active project.", command: "gcloud run services list", tags: ["cloud-run", "serverless"] },
  { id: "gcp-cloud-sql-connect", category: "GCP", title: "Connect to Cloud SQL", description: "Opens a direct connection to a Cloud SQL instance via the proxy.", command: "gcloud sql connect <instance-name> --user=root", tags: ["sql", "database", "connect"] },
  { id: "gcp-firewall-list", category: "GCP", title: "List firewall rules", description: "Shows all firewall rules in the project.", command: "gcloud compute firewall-rules list", tags: ["firewall", "network", "security"] },
  { id: "gcp-logs-read", category: "GCP", title: "Read Cloud Logging entries", description: "Fetches the last 20 log entries from Cloud Logging.", command: `gcloud logging read "resource.type=gce_instance" --limit 20 --format json`, tags: ["logging", "monitoring"] },
  { id: "gcp-artifact-registry", category: "GCP", title: "List Artifact Registry repos", description: "Lists container image repositories in Artifact Registry.", command: "gcloud artifacts repositories list --location=<region>", tags: ["artifact-registry", "docker"] },
  { id: "gcp-cloud-function-deploy", category: "GCP", title: "Deploy Cloud Function", description: "Deploys a Python Cloud Function triggered by HTTP.", command: "gcloud functions deploy my-func --runtime python311 --trigger-http --allow-unauthenticated --entry-point main", tags: ["functions", "serverless"] },
  { id: "gcp-iam-sa-list", category: "GCP", title: "List service accounts", description: "Lists all service accounts in the project.", command: "gcloud iam service-accounts list", tags: ["iam", "service-account"] },
  { id: "gcp-disks-list", category: "GCP", title: "List persistent disks", description: "Lists all persistent disks in the project.", command: "gcloud compute disks list", tags: ["compute", "storage", "disks"] },
  { id: "gcp-dns-list", category: "GCP", title: "List Cloud DNS zones", description: "Lists all managed DNS zones in the project.", command: "gcloud dns managed-zones list", tags: ["dns", "zones"] },
  { id: "gcp-gke-node-pools", category: "GCP", title: "List GKE node pools", description: "Lists node pools for a specific GKE cluster.", command: "gcloud container node-pools list --cluster=<cluster-name> --region=<region>", tags: ["gke", "nodes", "cluster"] },
  { id: "gcp-billing-export", category: "GCP", title: "List billing accounts", description: "Lists billing accounts you have access to.", command: "gcloud billing accounts list", tags: ["billing", "cost"] },

  // ====================== LINUX (25) ======================
  { id: "linux-find-large", category: "Linux", title: "Find top 10 largest directories", description: "Lists the top 10 largest directories in current path.", command: "du -hs * | sort -rh | head -10", tags: ["disk", "storage", "du"] },
  { id: "linux-find-large-files", category: "Linux", title: "Find files > 100MB", description: "Searches the filesystem for files exceeding 100MB.", command: "find / -type f -size +100M -exec ls -lh {} \\; | awk '{ print $9 \": \" $5 }'", tags: ["disk", "files", "find"] },
  { id: "linux-systemd-logs", category: "Linux", title: "Tail systemd service logs", description: "Follows journalctl logs for a service in real-time.", command: "journalctl -u <service-name> -f", tags: ["logs", "systemd"] },
  { id: "linux-kill-port", category: "Linux", title: "Kill process on specific port", description: "Forcefully kills the PID listening on a port.", command: "kill -9 $(lsof -t -i:<port_number>)", tags: ["process", "port", "kill"] },
  { id: "linux-cpu-hog", category: "Linux", title: "Find CPU hogging processes", description: "Lists the top 10 processes consuming the most CPU.", command: "ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head -11", tags: ["cpu", "performance", "ps"] },
  { id: "linux-grep-recursive", category: "Linux", title: "Search string recursively", description: "Searches for a string inside all files in a directory.", command: "grep -rnw '/path/to/somewhere/' -e 'pattern'", tags: ["search", "grep", "files"] },
  { id: "linux-symlink", category: "Linux", title: "Create soft symlink", description: "Creates a symbolic link pointing to a target file or directory.", command: "ln -s /path/to/target /path/to/link", tags: ["files", "symlink", "link"] },
  { id: "linux-chmod-dirs", category: "Linux", title: "Chmod ONLY directories", description: "Recursively changes permissions of directories only (leaving files untouched).", command: "find . -type d -exec chmod 755 {} \\;", tags: ["permissions", "chmod", "directories"] },
  { id: "linux-awk-column", category: "Linux", title: "Extract specific column with AWK", description: "Prints only the 3rd and 5th columns of a space-separated file.", command: "awk '{print $3, $5}' data.txt", tags: ["awk", "text", "processing"] },
  { id: "linux-sed-replace", category: "Linux", title: "Find and replace with SED", description: "Replaces 'old-string' with 'new-string' inline in a file.", command: "sed -i 's/old-string/new-string/g' config.yaml", tags: ["sed", "replace", "text"] },
  { id: "linux-xargs-rm", category: "Linux", title: "Delete files safely with xargs", description: "Finds all .log files older than 30 days and deletes them efficiently.", command: `find /var/log -name "*.log" -mtime +30 -print0 | xargs -0 rm -f`, tags: ["xargs", "find", "cleanup"] },
  { id: "linux-rsync", category: "Linux", title: "Sync directories securely", description: "Uses rsync to synchronize two directories over SSH, showing progress.", command: "rsync -avz --progress /local/dir/ user@remote:/remote/dir/", tags: ["rsync", "sync", "ssh"] },
  { id: "linux-free-mem", category: "Linux", title: "Check free memory", description: "Displays total, used, and free memory in human-readable megabytes/gigabytes.", command: "free -hm", tags: ["memory", "ram"] },
  { id: "linux-df", category: "Linux", title: "Check disk space", description: "Shows filesystem disk space usage and types.", command: "df -Th", tags: ["disk", "storage"] },
  { id: "linux-find-chown", category: "Linux", title: "Find and change owner", description: "Finds files owned by root and changes them to another user.", command: "find /path -user root -exec chown user:group {} +", tags: ["chown", "permissions"] },
  { id: "linux-tar-czf", category: "Linux", title: "Create tar.gz archive", description: "Compresses a directory into a tarball.", command: "tar -czvf archive.tar.gz /path/to/dir", tags: ["tar", "compress"] },
  { id: "linux-watch", category: "Linux", title: "Watch a command output", description: "Runs a command repeatedly every 2 seconds, refreshing output.", command: "watch -n 2 'kubectl get pods'", tags: ["watch", "monitoring", "repeat"] },
  { id: "linux-ss-listen", category: "Linux", title: "List listening sockets (ss)", description: "Modern replacement for netstat — shows all TCP listening sockets.", command: "ss -tlnp", tags: ["sockets", "network", "ports"] },
  { id: "linux-lsblk", category: "Linux", title: "List block devices", description: "Shows all block devices (disks, partitions) in a tree view.", command: "lsblk -f", tags: ["disk", "partitions", "lsblk"] },
  { id: "linux-systemctl-enable", category: "Linux", title: "Enable service on boot", description: "Enables a systemd service to start automatically on boot.", command: "sudo systemctl enable <service-name>", tags: ["systemd", "boot", "service"] },
  { id: "linux-history-grep", category: "Linux", title: "Search command history", description: "Searches your bash history for a specific command.", command: "history | grep <keyword>", tags: ["history", "search", "bash"] },
  { id: "linux-crontab", category: "Linux", title: "Edit cron jobs", description: "Opens the crontab editor to schedule recurring tasks.", command: "crontab -e", tags: ["cron", "schedule", "automation"] },
  { id: "linux-useradd", category: "Linux", title: "Create a new user", description: "Creates a new system user with a home directory.", command: "sudo useradd -m -s /bin/bash <username>", tags: ["user", "admin", "account"] },
  { id: "linux-uptime", category: "Linux", title: "Check system uptime and load", description: "Shows how long the system has been running plus load averages.", command: "uptime", tags: ["uptime", "load", "health"] },
  { id: "linux-dmesg", category: "Linux", title: "View kernel messages", description: "Shows kernel ring buffer messages, useful for hardware/driver debugging.", command: "dmesg --level=err,warn -T | tail -30", tags: ["kernel", "dmesg", "hardware"] },

  // ====================== NETWORKING (18) ======================
  { id: "linux-netstat", category: "Networking", title: "List active listening ports", description: "Shows active TCP/UDP listening ports.", command: "sudo netstat -tulnp", tags: ["ports", "network"] },
  { id: "net-curl-headers", category: "Networking", title: "Fetch HTTP headers only", description: "Fetches only the HTTP response headers.", command: "curl -I https://example.com", tags: ["http", "curl", "headers"] },
  { id: "net-dns-trace", category: "Networking", title: "Trace DNS resolution path", description: "Follows the DNS delegation path from root servers.", command: "dig +trace <domain>", tags: ["dns", "dig"] },
  { id: "net-test-port", category: "Networking", title: "Test TCP port connectivity", description: "Uses netcat to check if a remote TCP port is reachable.", command: "nc -vz <hostname> <port>", tags: ["tcp", "connectivity", "nc"] },
  { id: "net-tcpdump", category: "Networking", title: "Capture packets on port", description: "Captures and displays raw network traffic on a specific port.", command: "sudo tcpdump -i any port 80 -n -v", tags: ["tcpdump", "packets", "sniffing"] },
  { id: "net-ssl-cert", category: "Networking", title: "Check SSL cert expiry", description: "Fetches and displays the expiration date of a remote SSL certificate.", command: "echo | openssl s_client -servername example.com -connect example.com:443 2>/dev/null | openssl x509 -noout -dates", tags: ["ssl", "tls", "certificate"] },
  { id: "linux-curl-json", category: "Networking", title: "Format JSON with jq", description: "Fetches a JSON API response and formats it nicely using jq.", command: "curl -s https://api.github.com/users/octocat | jq '.'", tags: ["curl", "jq", "json"] },
  { id: "nginx-test-config", category: "Networking", title: "Test Nginx configuration", description: "Tests the Nginx config files for syntax errors before reloading.", command: "sudo nginx -t", tags: ["nginx", "config", "test"] },
  { id: "nginx-reload", category: "Networking", title: "Reload Nginx gracefully", description: "Reloads the Nginx configuration without dropping active connections.", command: "sudo nginx -s reload", tags: ["nginx", "reload"] },
  { id: "nginx-access-logs", category: "Networking", title: "Monitor Nginx access logs", description: "Tails the Nginx access logs and uses awk to show only IPs and HTTP status.", command: "tail -f /var/log/nginx/access.log | awk '{print $1, $9}'", tags: ["nginx", "logs", "awk"] },
  { id: "net-ip-route", category: "Networking", title: "Check IP routing", description: "Determines exactly which interface and route will be used to reach an IP.", command: "ip route get 8.8.8.8", tags: ["route", "ip"] },
  { id: "net-ping-interface", category: "Networking", title: "Ping via specific interface", description: "Forces ping to use a specific network interface.", command: "ping -I eth1 8.8.8.8", tags: ["ping", "interface"] },
  { id: "net-mtr", category: "Networking", title: "Network path analysis (mtr)", description: "Combines ping and traceroute for real-time network path analysis.", command: "mtr --report <hostname>", tags: ["mtr", "traceroute", "latency"] },
  { id: "net-iptables-list", category: "Networking", title: "List iptables rules", description: "Shows all current iptables firewall rules with line numbers.", command: "sudo iptables -L -n -v --line-numbers", tags: ["iptables", "firewall", "rules"] },
  { id: "net-nslookup", category: "Networking", title: "DNS lookup", description: "Queries a DNS server to resolve a domain name.", command: "nslookup <domain> 8.8.8.8", tags: ["dns", "nslookup", "resolve"] },
  { id: "net-wget-mirror", category: "Networking", title: "Mirror a website with wget", description: "Downloads an entire website for offline browsing.", command: "wget --mirror --convert-links --page-requisites <url>", tags: ["wget", "download", "mirror"] },
  { id: "net-curl-post", category: "Networking", title: "Send POST request with JSON", description: "Sends a JSON payload to an API endpoint.", command: `curl -X POST -H "Content-Type: application/json" -d '{"key":"value"}' https://api.example.com/endpoint`, tags: ["curl", "post", "api"] },
  { id: "net-whois", category: "Networking", title: "WHOIS domain lookup", description: "Fetches domain registration information.", command: "whois example.com", tags: ["whois", "domain", "dns"] },

  // ====================== DOCKER (15) ======================
  { id: "docker-clean-all", category: "Docker", title: "Nuke all Docker resources", description: "Stops and removes all containers, images, volumes, and networks.", command: "docker stop $(docker ps -aq) && docker system prune -a --volumes -f", tags: ["cleanup", "nuke", "prune"] },
  { id: "docker-shell", category: "Docker", title: "Open shell in running container", description: "Executes an interactive bash shell.", command: "docker exec -it <container-id> /bin/bash", tags: ["exec", "shell"] },
  { id: "docker-stats", category: "Docker", title: "Live container metrics", description: "Shows a live stream of CPU/Memory usage.", command: "docker stats", tags: ["metrics", "performance"] },
  { id: "docker-build-no-cache", category: "Docker", title: "Build image without cache", description: "Forces a completely fresh docker build bypassing all cached layers.", command: "docker build --no-cache -t <image-name>:<tag> .", tags: ["build", "cache"] },
  { id: "docker-dangling", category: "Docker", title: "Remove dangling images", description: "Removes untagged '<none>' images that take up disk space.", command: `docker rmi $(docker images -f "dangling=true" -q)`, tags: ["cleanup", "images"] },
  { id: "docker-compose-up", category: "Docker", title: "Docker Compose up (detached)", description: "Starts all services defined in a docker-compose.yml in the background.", command: "docker compose up -d", tags: ["compose", "daemon"] },
  { id: "docker-inspect-ip", category: "Docker", title: "Get container IP", description: "Extracts the internal IP address of a running docker container.", command: "docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container-id>", tags: ["inspect", "ip"] },
  { id: "docker-logs-follow", category: "Docker", title: "Follow container logs", description: "Tails the logs of a docker container continuously.", command: "docker logs -f <container-id>", tags: ["logs", "tail"] },
  { id: "docker-volume-ls", category: "Docker", title: "List volumes", description: "Lists all Docker volumes on the host.", command: "docker volume ls", tags: ["volume", "storage"] },
  { id: "docker-network-ls", category: "Docker", title: "List networks", description: "Lists all Docker networks.", command: "docker network ls", tags: ["network", "list"] },
  { id: "docker-tag", category: "Docker", title: "Tag an image", description: "Tags a local image with a new name for pushing to a registry.", command: "docker tag <image-id> <registry>/<repo>:<tag>", tags: ["tag", "registry"] },
  { id: "docker-push", category: "Docker", title: "Push image to registry", description: "Pushes a tagged image to a container registry.", command: "docker push <registry>/<repo>:<tag>", tags: ["push", "registry"] },
  { id: "docker-cp", category: "Docker", title: "Copy files from container", description: "Copies a file from inside a running container to the host.", command: "docker cp <container-id>:/path/in/container /local/path", tags: ["copy", "files"] },
  { id: "docker-history", category: "Docker", title: "View image layer history", description: "Shows the build history and layer sizes of a Docker image.", command: "docker history <image-name>", tags: ["history", "layers", "debug"] },
  { id: "docker-save-load", category: "Docker", title: "Export image as tar", description: "Saves a Docker image to a tar file for offline transfer.", command: "docker save -o myimage.tar <image-name> && docker load -i myimage.tar", tags: ["save", "export", "offline"] },

  // ====================== GIT (15) ======================
  { id: "git-undo-commit", category: "Git", title: "Undo last commit (keep changes)", description: "Removes the last commit but keeps changes in working directory.", command: "git reset HEAD~1", tags: ["undo", "reset"] },
  { id: "git-force-pull", category: "Git", title: "Force overwrite local branch", description: "Discards local changes to match remote.", command: "git fetch --all && git reset --hard origin/<branch-name>", tags: ["force", "pull"] },
  { id: "git-clean-branches", category: "Git", title: "Delete merged local branches", description: "Deletes branches already merged into main.", command: `git branch --merged | egrep -v "(^\\*|main|master)" | xargs git branch -d`, tags: ["cleanup", "branches"] },
  { id: "git-stash-push", category: "Git", title: "Stash specific files", description: "Interactively choose which changes to stash.", command: `git stash push -p -m "message"`, tags: ["stash", "interactive"] },
  { id: "git-squash", category: "Git", title: "Interactive rebase (squash)", description: "Starts an interactive rebase for the last N commits.", command: "git rebase -i HEAD~3", tags: ["rebase", "squash", "history"] },
  { id: "git-cherry-pick", category: "Git", title: "Cherry pick a commit", description: "Applies the changes introduced by a specific commit from another branch.", command: "git cherry-pick <commit-hash>", tags: ["cherry-pick", "commits"] },
  { id: "gh-run-list", category: "Git", title: "List recent GH Action runs", description: "Lists the most recent GitHub Actions workflow runs (requires gh cli).", command: "gh run list --limit 5", tags: ["github", "actions", "cli"] },
  { id: "gh-run-watch", category: "Git", title: "Watch GH Action progress", description: "Follows the logs of a running GitHub Actions workflow.", command: "gh run watch", tags: ["github", "actions", "logs"] },
  { id: "git-fetch-prune", category: "Git", title: "Fetch and prune remote branches", description: "Fetches updates and removes local tracking branches that were deleted on remote.", command: "git fetch -p", tags: ["fetch", "prune"] },
  { id: "git-rebase-origin", category: "Git", title: "Rebase onto origin main", description: "Fetches and immediately rebases your current branch onto the latest origin/main.", command: "git pull --rebase origin main", tags: ["rebase", "sync"] },
  { id: "git-tag-release", category: "Git", title: "Create annotated tag", description: "Creates a version tag with a message.", command: "git tag -a v1.0.0 -m 'Release v1.0.0'", tags: ["tag", "release"] },
  { id: "git-bisect", category: "Git", title: "Binary search for bug (bisect)", description: "Uses binary search to find the commit that introduced a bug.", command: "git bisect start && git bisect bad && git bisect good <known-good-commit>", tags: ["bisect", "debug", "history"] },
  { id: "git-log-graph", category: "Git", title: "Pretty git log graph", description: "Shows a compact, colorful branch/merge history.", command: "git log --oneline --graph --decorate --all", tags: ["log", "graph", "history"] },
  { id: "git-diff-staged", category: "Git", title: "Diff staged changes", description: "Shows the diff of files staged for the next commit.", command: "git diff --staged", tags: ["diff", "staged", "review"] },
  { id: "git-blame", category: "Git", title: "Blame a file", description: "Shows who last modified each line of a file.", command: "git blame <filename>", tags: ["blame", "history", "author"] },

  // ====================== TERRAFORM (15) ======================
  { id: "tf-plan-out", category: "Terraform", title: "Generate and save a plan", description: "Generates an execution plan to a file.", command: "terraform plan -out=tfplan", tags: ["plan", "review"] },
  { id: "tf-apply-auto", category: "Terraform", title: "Apply without confirmation", description: "Applies changes automatically.", command: "terraform apply -auto-approve", tags: ["apply", "ci-cd"] },
  { id: "tf-import", category: "Terraform", title: "Import existing resource", description: "Brings existing cloud resource under TF state.", command: "terraform import aws_instance.my_server i-1234567890", tags: ["import", "state"] },
  { id: "tf-state-rm", category: "Terraform", title: "Remove resource from state", description: "Removes a resource from state tracking without destroying the actual cloud resource.", command: "terraform state rm <resource_address>", tags: ["state", "remove"] },
  { id: "tf-force-unlock", category: "Terraform", title: "Force unlock state file", description: "Manually removes a lock on the state file if a previous pipeline crashed.", command: "terraform force-unlock <lock-id>", tags: ["state", "lock", "debug"] },
  { id: "tf-init-upgrade", category: "Terraform", title: "Init and upgrade providers", description: "Initializes terraform and upgrades all providers to their latest allowed versions.", command: "terraform init -upgrade", tags: ["init", "providers"] },
  { id: "tf-workspace-list", category: "Terraform", title: "List Terraform workspaces", description: "Shows all available state workspaces.", command: "terraform workspace list", tags: ["workspace", "state"] },
  { id: "tf-validate", category: "Terraform", title: "Validate configuration", description: "Validates the syntax and internal consistency of terraform files.", command: "terraform validate", tags: ["validate", "syntax"] },
  { id: "tf-fmt", category: "Terraform", title: "Format terraform files", description: "Rewrites all .tf files to a canonical format.", command: "terraform fmt -recursive", tags: ["format", "style"] },
  { id: "tf-output", category: "Terraform", title: "Show outputs", description: "Displays the output values from your terraform state.", command: "terraform output -json", tags: ["output", "state"] },
  { id: "tf-state-list", category: "Terraform", title: "List all resources in state", description: "Shows all resources currently tracked by terraform.", command: "terraform state list", tags: ["state", "inventory"] },
  { id: "tf-state-show", category: "Terraform", title: "Show resource in state", description: "Displays attributes of a single resource in the state.", command: "terraform state show <resource_address>", tags: ["state", "inspect"] },
  { id: "tf-graph", category: "Terraform", title: "Generate dependency graph", description: "Generates a visual dependency graph of resources in DOT format.", command: "terraform graph | dot -Tpng > graph.png", tags: ["graph", "visualization"] },
  { id: "tf-taint", category: "Terraform", title: "Taint a resource", description: "Marks a resource for forced recreation on next apply.", command: "terraform taint <resource_address>", tags: ["taint", "recreate"] },
  { id: "tf-workspace-new", category: "Terraform", title: "Create new workspace", description: "Creates and switches to a new terraform workspace.", command: "terraform workspace new <workspace-name>", tags: ["workspace", "create"] },

  // ====================== DATABASE (15) ======================
  { id: "db-pg-dump", category: "Database", title: "Backup PostgreSQL database", description: "Creates a logical backup of a PostgreSQL database.", command: "pg_dump -U <username> -h <host> -d <database_name> > backup.sql", tags: ["postgres", "backup"] },
  { id: "db-mysql-import", category: "Database", title: "Import MySQL database", description: "Imports an SQL file into a MySQL database.", command: "mysql -u <username> -p <database_name> < backup.sql", tags: ["mysql", "import", "restore"] },
  { id: "db-redis-flush", category: "Database", title: "Flush all Redis keys", description: "Connects to redis-cli and deletes all keys in all databases.", command: "redis-cli flushall", tags: ["redis", "cache", "flush"] },
  { id: "elk-cluster-health", category: "Database", title: "Check Elasticsearch health", description: "Fetches the current health status of the ES cluster.", command: `curl -X GET "localhost:9200/_cluster/health?pretty"`, tags: ["elasticsearch", "elk", "health"] },
  { id: "elk-list-indices", category: "Database", title: "List Elasticsearch indices", description: "Shows all indices in the ES cluster with their health, status, and size.", command: `curl -X GET "localhost:9200/_cat/indices?v"`, tags: ["elasticsearch", "elk", "indices"] },
  { id: "elk-delete-index", category: "Database", title: "Delete Elasticsearch index", description: "Permanently deletes a specific index (use with caution).", command: `curl -X DELETE "localhost:9200/my-index-name"`, tags: ["elasticsearch", "elk", "delete"] },
  { id: "db-pg-restore", category: "Database", title: "Restore PostgreSQL database", description: "Restores a database from a pg_dump file.", command: "pg_restore -U <username> -d <dbname> -1 backup.sql", tags: ["postgres", "restore"] },
  { id: "db-mysql-dump", category: "Database", title: "Backup MySQL database", description: "Dumps a MySQL database to an SQL script.", command: "mysqldump -u <username> -p <dbname> > backup.sql", tags: ["mysql", "dump", "backup"] },
  { id: "db-redis-info", category: "Database", title: "Redis server info", description: "Shows detailed information about the Redis server.", command: "redis-cli info", tags: ["redis", "info", "status"] },
  { id: "db-redis-keys", category: "Database", title: "Search Redis keys by pattern", description: "Lists all keys matching a glob-style pattern.", command: `redis-cli keys "user:*"`, tags: ["redis", "keys", "search"] },
  { id: "db-mongo-export", category: "Database", title: "Export MongoDB collection", description: "Exports a MongoDB collection to a JSON file.", command: "mongoexport --db=mydb --collection=users --out=users.json", tags: ["mongo", "export", "json"] },
  { id: "db-mongo-import", category: "Database", title: "Import MongoDB collection", description: "Imports a JSON file into a MongoDB collection.", command: "mongoimport --db=mydb --collection=users --file=users.json", tags: ["mongo", "import", "json"] },
  { id: "db-pg-connections", category: "Database", title: "Check active PG connections", description: "Shows all active connections and their states in PostgreSQL.", command: "psql -c \"SELECT pid, usename, state, query FROM pg_stat_activity WHERE state != 'idle';\"", tags: ["postgres", "connections", "debug"] },
  { id: "db-pg-size", category: "Database", title: "Check database size (PG)", description: "Shows the size of each database in PostgreSQL.", command: "psql -c \"SELECT pg_database.datname, pg_size_pretty(pg_database_size(pg_database.datname)) FROM pg_database;\"", tags: ["postgres", "size", "storage"] },
  { id: "db-mysql-processlist", category: "Database", title: "Show MySQL process list", description: "Shows all currently running queries in MySQL.", command: "mysql -e 'SHOW FULL PROCESSLIST;'", tags: ["mysql", "process", "debug"] },

  // ====================== SECURITY (12) ======================
  { id: "sec-ssh-tunnel", category: "Security", title: "Create SSH tunnel (local port forward)", description: "Tunnels local port 8080 securely to remote port 80 via a bastion host.", command: "ssh -L 8080:localhost:80 user@bastion-host.com", tags: ["ssh", "tunnel", "forwarding"] },
  { id: "sec-generate-ssh", category: "Security", title: "Generate ED25519 SSH key", description: "Generates a highly secure modern SSH key pair.", command: `ssh-keygen -t ed25519 -C "your_email@example.com"`, tags: ["ssh", "keygen", "keys"] },
  { id: "ssl-generate-csr", category: "Security", title: "Generate CSR and private key", description: "Creates a new 2048-bit RSA private key and a Certificate Signing Request.", command: "openssl req -new -newkey rsa:2048 -nodes -keyout mydomain.key -out mydomain.csr", tags: ["ssl", "openssl", "csr"] },
  { id: "ssl-check-cert", category: "Security", title: "Check local SSL certificate", description: "Reads an x509 certificate file and outputs its details.", command: "openssl x509 -in certificate.crt -text -noout", tags: ["ssl", "openssl", "verify"] },
  { id: "sec-nmap", category: "Security", title: "Scan open ports with Nmap", description: "Performs a fast network scan to find open ports on a target IP.", command: "nmap -F 192.168.1.1", tags: ["nmap", "scan", "ports"] },
  { id: "sec-chmod-ssh", category: "Security", title: "Fix SSH key permissions", description: "Secures a private SSH key file so only the owner can read it.", command: "chmod 600 ~/.ssh/id_rsa", tags: ["ssh", "permissions"] },
  { id: "sec-fail2ban-status", category: "Security", title: "Check fail2ban status", description: "Shows the status of fail2ban jails and banned IPs.", command: "sudo fail2ban-client status sshd", tags: ["fail2ban", "brute-force", "ssh"] },
  { id: "sec-gpg-encrypt", category: "Security", title: "Encrypt file with GPG", description: "Encrypts a file using symmetric encryption with GPG.", command: "gpg -c sensitive-file.txt", tags: ["gpg", "encrypt", "files"] },
  { id: "sec-audit-suid", category: "Security", title: "Find SUID binaries", description: "Finds all binaries with the SUID bit set (potential privilege escalation vectors).", command: "find / -perm -4000 -type f 2>/dev/null", tags: ["suid", "audit", "privilege"] },
  { id: "sec-last-logins", category: "Security", title: "Show recent logins", description: "Displays the last 20 user login records.", command: "last -n 20", tags: ["login", "audit", "users"] },
  { id: "sec-password-hash", category: "Security", title: "Generate bcrypt password hash", description: "Creates a bcrypt hash of a password using Python.", command: "python3 -c \"import bcrypt; print(bcrypt.hashpw(b'password', bcrypt.gensalt()).decode())\"", tags: ["bcrypt", "hash", "password"] },
  { id: "sec-ssh-copy-id", category: "Security", title: "Copy SSH key to server", description: "Installs your public key on a remote server for passwordless login.", command: "ssh-copy-id -i ~/.ssh/id_ed25519.pub user@remote-host", tags: ["ssh", "key", "auth"] },

  // ====================== DEBUGGING (12) ======================
  { id: "debug-strace", category: "Debugging", title: "Trace system calls of a process", description: "Prints out all system calls a PID makes (crucial for deep debugging).", command: "strace -p <pid>", tags: ["strace", "syscalls"] },
  { id: "debug-tar-gz", category: "Debugging", title: "Extract tar.gz archive", description: "Extracts a compressed tarball archive to the current directory.", command: "tar -xzvf archive.tar.gz", tags: ["tar", "unzip", "archive"] },
  { id: "promql-cpu-usage", category: "Debugging", title: "PromQL: Pod CPU usage", description: "Calculates the rate of CPU usage per pod over a 5-minute window.", command: `rate(container_cpu_usage_seconds_total{namespace="default"}[5m])`, tags: ["prometheus", "promql", "cpu"] },
  { id: "promql-memory-usage", category: "Debugging", title: "PromQL: Pod memory usage", description: "Gets the current memory usage of pods in megabytes.", command: `container_memory_usage_bytes{namespace="default"} / 1024 / 1024`, tags: ["prometheus", "promql", "memory"] },
  { id: "grafana-restart", category: "Debugging", title: "Restart Grafana server", description: "Restarts the grafana systemd service.", command: "sudo systemctl restart grafana-server", tags: ["grafana", "systemd", "restart"] },
  { id: "debug-lsof-pid", category: "Debugging", title: "List open files by process", description: "Shows all files, sockets, and connections opened by a PID.", command: "lsof -p <pid>", tags: ["lsof", "files", "sockets"] },
  { id: "debug-perf-top", category: "Debugging", title: "Live CPU profiling (perf)", description: "Shows a live view of the hottest CPU functions in the system.", command: "sudo perf top", tags: ["perf", "cpu", "profiling"] },
  { id: "debug-vmstat", category: "Debugging", title: "Virtual memory stats", description: "Shows system performance statistics (CPU, memory, I/O) every 2 seconds.", command: "vmstat 2 10", tags: ["vmstat", "memory", "io"] },
  { id: "debug-iostat", category: "Debugging", title: "Disk I/O statistics", description: "Shows CPU and disk I/O stats, refreshing every second.", command: "iostat -xz 1", tags: ["iostat", "disk", "io"] },
  { id: "debug-netstat-connections", category: "Debugging", title: "Count connections by state", description: "Groups and counts TCP connections by their state (ESTABLISHED, TIME_WAIT, etc.).", command: "ss -tan | awk '{print $1}' | sort | uniq -c | sort -rn", tags: ["connections", "tcp", "debug"] },
  { id: "debug-coredump", category: "Debugging", title: "Generate core dump", description: "Sends SIGABRT to a process to generate a core dump for post-mortem analysis.", command: "kill -ABRT <pid>", tags: ["core", "dump", "crash"] },
  { id: "debug-curl-timing", category: "Debugging", title: "Curl with timing breakdown", description: "Shows detailed timing of DNS, connect, TLS, and transfer phases.", command: `curl -o /dev/null -s -w "DNS: %{time_namelookup}s\\nConnect: %{time_connect}s\\nTLS: %{time_appconnect}s\\nTotal: %{time_total}s\\n" https://example.com`, tags: ["curl", "timing", "latency"] },

  // ====================== CI/CD (12) ======================
  { id: "cicd-act", category: "CI/CD", title: "Run GitHub Actions locally", description: "Uses nektos/act to run your github actions locally via docker.", command: "act -l", tags: ["github-actions", "act", "local"] },
  { id: "cicd-gh-pr-create", category: "CI/CD", title: "Create PR via CLI", description: "Creates a pull request from the current branch using GitHub CLI.", command: `gh pr create --title "feat: my feature" --body "Description" --base main`, tags: ["github", "pr", "cli"] },
  { id: "cicd-gh-pr-merge", category: "CI/CD", title: "Merge PR via CLI", description: "Merges a pull request using squash merge.", command: "gh pr merge --squash --delete-branch", tags: ["github", "pr", "merge"] },
  { id: "cicd-gh-release", category: "CI/CD", title: "Create GitHub release", description: "Creates a new release on GitHub with auto-generated notes.", command: "gh release create v1.0.0 --generate-notes", tags: ["github", "release", "tag"] },
  { id: "cicd-jenkins-build", category: "CI/CD", title: "Trigger Jenkins build via API", description: "Triggers a Jenkins job build remotely using curl.", command: `curl -X POST "https://jenkins.example.com/job/<job-name>/build" --user <user>:<token>`, tags: ["jenkins", "trigger", "api"] },
  { id: "cicd-docker-scout", category: "CI/CD", title: "Scan image with Docker Scout", description: "Scans a container image for known CVEs.", command: "docker scout cves <image-name>:<tag>", tags: ["security", "cve", "scan"] },
  { id: "cicd-trivy-scan", category: "CI/CD", title: "Scan image with Trivy", description: "Scans a container image for vulnerabilities using Trivy.", command: "trivy image <image-name>:<tag>", tags: ["trivy", "security", "vulnerability"] },
  { id: "cicd-hadolint", category: "CI/CD", title: "Lint Dockerfile", description: "Lints a Dockerfile for best practices and common mistakes.", command: "hadolint Dockerfile", tags: ["dockerfile", "lint", "best-practices"] },
  { id: "cicd-argocd-sync", category: "CI/CD", title: "ArgoCD sync app", description: "Forces a sync of an ArgoCD application.", command: "argocd app sync <app-name>", tags: ["argocd", "gitops", "sync"] },
  { id: "cicd-argocd-diff", category: "CI/CD", title: "ArgoCD diff", description: "Shows the diff between the live state and desired state in ArgoCD.", command: "argocd app diff <app-name>", tags: ["argocd", "gitops", "diff"] },
  { id: "cicd-gh-workflow-run", category: "CI/CD", title: "Manually trigger workflow", description: "Triggers a workflow_dispatch event on a GitHub Actions workflow.", command: "gh workflow run <workflow-name>", tags: ["github-actions", "dispatch", "trigger"] },
  { id: "cicd-semver-bump", category: "CI/CD", title: "Semantic version bump", description: "Bumps the version in package.json using npm.", command: "npm version patch -m 'chore: bump version to %s'", tags: ["semver", "version", "release"] },

  // ====================== ANSIBLE (10) ======================
  { id: "ansible-ping", category: "Ansible", title: "Ping all hosts", description: "Verifies connectivity and python availability on all inventory hosts.", command: "ansible all -m ping -i inventory.ini", tags: ["ping", "connectivity"] },
  { id: "ansible-playbook-dryrun", category: "Ansible", title: "Playbook dry run", description: "Runs a playbook in check mode to see what would change without actually changing anything.", command: "ansible-playbook playbook.yml --check --diff", tags: ["playbook", "dry-run"] },
  { id: "ansible-gather-facts", category: "Ansible", title: "Gather facts from host", description: "Collects system information (facts) from a specific host.", command: "ansible <hostname> -m setup", tags: ["facts", "system"] },
  { id: "ansible-ad-hoc-cmd", category: "Ansible", title: "Run ad-hoc command", description: "Executes a one-off shell command on all hosts.", command: "ansible all -m shell -a 'uptime' -i inventory.ini", tags: ["ad-hoc", "shell"] },
  { id: "ansible-vault-encrypt", category: "Ansible", title: "Encrypt file with Vault", description: "Encrypts a sensitive file (like secrets.yml) using Ansible Vault.", command: "ansible-vault encrypt secrets.yml", tags: ["vault", "encrypt", "secrets"] },
  { id: "ansible-vault-view", category: "Ansible", title: "View encrypted Vault file", description: "Decrypts and displays the contents of a vault-encrypted file.", command: "ansible-vault view secrets.yml", tags: ["vault", "decrypt", "view"] },
  { id: "ansible-inventory-graph", category: "Ansible", title: "Show inventory graph", description: "Displays the host/group structure of your inventory as a tree.", command: "ansible-inventory --graph -i inventory.ini", tags: ["inventory", "graph", "hosts"] },
  { id: "ansible-playbook-tags", category: "Ansible", title: "Run playbook with tags", description: "Runs only the tasks tagged with a specific tag.", command: "ansible-playbook playbook.yml --tags deploy", tags: ["playbook", "tags", "selective"] },
  { id: "ansible-galaxy-install", category: "Ansible", title: "Install Ansible role", description: "Installs a role from Ansible Galaxy.", command: "ansible-galaxy install geerlingguy.docker", tags: ["galaxy", "role", "install"] },
  { id: "ansible-lint", category: "Ansible", title: "Lint playbooks", description: "Checks playbooks for best practices and potential issues.", command: "ansible-lint playbook.yml", tags: ["lint", "best-practices"] },

  // ====================== MONITORING (12) ======================
  { id: "mon-prom-query-api", category: "Monitoring", title: "Query Prometheus API", description: "Fetches current metric values from the Prometheus HTTP API.", command: `curl -s "http://localhost:9090/api/v1/query?query=up" | jq .`, tags: ["prometheus", "api", "query"] },
  { id: "mon-prom-targets", category: "Monitoring", title: "Check Prometheus targets", description: "Lists all scrape targets and their health status.", command: `curl -s "http://localhost:9090/api/v1/targets" | jq '.data.activeTargets[] | {job: .labels.job, health: .health}'`, tags: ["prometheus", "targets", "health"] },
  { id: "mon-grafana-api-ds", category: "Monitoring", title: "List Grafana datasources", description: "Lists all configured data sources in Grafana via API.", command: `curl -s -H "Authorization: Bearer <api-key>" http://localhost:3000/api/datasources | jq .`, tags: ["grafana", "datasource", "api"] },
  { id: "mon-alertmanager-status", category: "Monitoring", title: "Check Alertmanager status", description: "Shows the current status and active alerts in Alertmanager.", command: `curl -s http://localhost:9093/api/v2/alerts | jq .`, tags: ["alertmanager", "alerts", "status"] },
  { id: "mon-node-exporter", category: "Monitoring", title: "Check Node Exporter metrics", description: "Fetches raw metrics from Node Exporter.", command: "curl -s http://localhost:9100/metrics | grep node_cpu_seconds_total | head -5", tags: ["node-exporter", "metrics", "cpu"] },
  { id: "mon-loki-query", category: "Monitoring", title: "Query Loki logs", description: "Queries Loki for logs matching a label selector.", command: `curl -s "http://localhost:3100/loki/api/v1/query_range" --data-urlencode 'query={job="varlogs"}' | jq .`, tags: ["loki", "logs", "query"] },
  { id: "mon-promql-error-rate", category: "Monitoring", title: "PromQL: HTTP error rate", description: "Calculates the percentage of 5xx responses over the last 5 minutes.", command: `sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100`, tags: ["promql", "errors", "sre"] },
  { id: "mon-promql-p99-latency", category: "Monitoring", title: "PromQL: P99 latency", description: "Calculates the 99th percentile request latency from a histogram.", command: `histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))`, tags: ["promql", "latency", "p99"] },
  { id: "mon-k8s-metrics-server", category: "Monitoring", title: "Check Metrics Server", description: "Verifies that the Kubernetes metrics-server is running and healthy.", command: "kubectl get deployment metrics-server -n kube-system", tags: ["metrics-server", "k8s", "health"] },
  { id: "mon-blackbox-probe", category: "Monitoring", title: "Blackbox Exporter probe", description: "Tests HTTP endpoint availability using Blackbox Exporter.", command: `curl -s "http://localhost:9115/probe?target=https://example.com&module=http_2xx" | grep probe_success`, tags: ["blackbox", "probe", "uptime"] },
  { id: "mon-jaeger-traces", category: "Monitoring", title: "Query Jaeger traces", description: "Fetches recent traces from Jaeger for a specific service.", command: `curl -s "http://localhost:16686/api/traces?service=my-service&limit=5" | jq '.data[].traceID'`, tags: ["jaeger", "tracing", "distributed"] },
  { id: "mon-cadvisor-stats", category: "Monitoring", title: "cAdvisor container stats", description: "Fetches container-level resource stats from cAdvisor.", command: `curl -s http://localhost:8080/api/v1.3/containers | jq '.spec.cpu'`, tags: ["cadvisor", "containers", "metrics"] },
];


// ============================================================
//  Application Logic
// ============================================================

// --- DOM Elements ---
const sidebarNav = document.getElementById("sidebar-nav");
const searchInput = document.getElementById("search-input");
const searchCount = document.getElementById("search-count");
const commandsContainer = document.getElementById("commands-container");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const sidebar = document.getElementById("sidebar");

let activeCategory = null;

// --- Helper: Slugify category name for CSS class ---
function catSlug(category) {
  return "cat-" + category.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// --- Helper: Escape HTML ---
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// --- Build Sidebar ---
function buildSidebar() {
  const counts = {};
  let total = commands.length;
  commands.forEach((cmd) => {
    counts[cmd.category] = (counts[cmd.category] || 0) + 1;
  });

  const sorted = Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));

  let html = `<h4 class="nav-title">Categories</h4>`;
  html += `<button class="nav-btn active" data-category="">
    <span>All Commands</span><span class="nav-badge">${total}</span>
  </button>`;

  sorted.forEach(([name, count]) => {
    html += `<button class="nav-btn" data-category="${name}">
      <span>${name}</span><span class="nav-badge">${count}</span>
    </button>`;
  });

  sidebarNav.innerHTML = html;

  // Bind click events
  sidebarNav.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category || null;
      sidebarNav.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderCommands();

      // Close mobile sidebar
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("open");
      }
    });
  });
}

// --- Filter Commands ---
function getFilteredCommands() {
  const query = searchInput.value.toLowerCase().trim();
  let results = commands;

  if (activeCategory) {
    results = results.filter((cmd) => cmd.category === activeCategory);
  }

  if (query) {
    results = results.filter((cmd) => {
      return (
        cmd.title.toLowerCase().includes(query) ||
        cmd.description.toLowerCase().includes(query) ||
        cmd.command.toLowerCase().includes(query) ||
        cmd.category.toLowerCase().includes(query) ||
        cmd.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }

  return results;
}

// --- Render Commands ---
function renderCommands() {
  const filtered = getFilteredCommands();

  searchCount.textContent = `${filtered.length} command${filtered.length !== 1 ? "s" : ""}`;

  if (filtered.length === 0) {
    commandsContainer.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <p>No commands found. Try adjusting your search or category.</p>
      </div>`;
    return;
  }

  let html = "";
  filtered.forEach((cmd, index) => {
    const delay = Math.min(index * 0.03, 1.5); // cap at 1.5s
    html += `
      <div class="command-card ${catSlug(cmd.category)}" style="animation-delay: ${delay}s">
        <div class="card-header">
          <span class="card-category">${escapeHtml(cmd.category)}</span>
          <h3 class="card-title">${escapeHtml(cmd.title)}</h3>
        </div>
        <p class="card-description">${escapeHtml(cmd.description)}</p>
        <div class="code-container">
          <code class="code-text">${escapeHtml(cmd.command)}</code>
          <button class="copy-btn" onclick="copyCommand(this, '${escapeHtml(cmd.command).replace(/'/g, "\\'")}')" aria-label="Copy command">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </svg>
          </button>
        </div>
        <div class="card-tags">
          ${cmd.tags.map((tag) => `<span class="tag">#${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>`;
  });

  commandsContainer.innerHTML = html;
}

// --- Copy to Clipboard ---
function copyCommand(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add("copied");
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>`;
    setTimeout(() => {
      btn.classList.remove("copied");
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
      </svg>`;
    }, 2000);
  });
}

// --- Search ---
let searchTimeout;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(renderCommands, 150);
});

// --- Mobile Menu ---
mobileMenuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// --- Particles.js Config ---
function initParticles() {
  if (typeof particlesJS === "undefined") return;

  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 900 } },
      color: { value: ["#3b82f6", "#8b5cf6", "#06b6d4"] },
      shape: { type: "circle" },
      opacity: {
        value: 0.5,
        random: true,
        anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false },
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.5, sync: false },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#3b82f6",
        opacity: 0.15,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.4 } },
        push: { particles_nb: 3 },
      },
    },
    retina_detect: true,
  });
}

// --- Init ---
document.addEventListener("DOMContentLoaded", () => {
  buildSidebar();
  renderCommands();
  initParticles();
});
