export type Category = "AWS" | "GCP" | "Linux" | "Networking" | "Kubernetes" | "Karpenter" | "Debugging" | "Docker" | "Git" | "Terraform" | "Database" | "Security" | "Helm" | "CI/CD";

export interface CommandEntry {
  id: string;
  category: Category;
  title: string;
  description: string;
  command: string;
  sampleOutput?: string;
  tags: string[];
}

export const commands: CommandEntry[] = [
  // ====================== KUBERNETES ======================
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
  { id: "k8s-exec-sh", category: "Kubernetes", title: "Interactive Shell in Pod", description: "Opens an interactive shell session inside a running pod.", command: "kubectl exec -it <pod-name> -- /bin/sh", tags: ["exec", "shell", "interactive"] },
  { id: "k8s-restart-deployment", category: "Kubernetes", title: "Restart a Deployment", description: "Triggers a rolling restart of all pods in a deployment.", command: "kubectl rollout restart deployment/<deployment-name>", tags: ["rollout", "restart", "deployment"] },
  { id: "k8s-scale", category: "Kubernetes", title: "Scale Deployment", description: "Instantly scales the number of replicas for a resource.", command: "kubectl scale deployment/<deployment-name> --replicas=5", tags: ["scale", "replicas", "capacity"] },
  { id: "k8s-set-image", category: "Kubernetes", title: "Update Image in Deployment", description: "Updates the container image of a deployment without editing YAML.", command: "kubectl set image deployment/my-app my-app=my-image:v2.0", tags: ["image", "update", "deploy"] },
  { id: "k8s-explain", category: "Kubernetes", title: "Explain K8s API Resource", description: "Shows the documentation and fields for a specific Kubernetes resource.", command: "kubectl explain pod.spec.containers", tags: ["explain", "docs", "api"] },
  
  // ====================== HELM ======================
  { id: "helm-list-all", category: "Helm", title: "List all releases across namespaces", description: "Lists all Helm deployments in the cluster.", command: "helm ls --all-namespaces", tags: ["helm", "deployments"] },
  { id: "helm-rollback", category: "Helm", title: "Rollback a release", description: "Rolls back a Helm deployment to a specific prior revision.", command: "helm rollback <release-name> <revision-number>", tags: ["helm", "rollback", "revert"] },
  { id: "helm-get-values", category: "Helm", title: "Get deployed values", description: "Fetches the values.yaml that was actually applied to a deployed release.", command: "helm get values <release-name>", tags: ["helm", "config", "values"] },
  
  // ====================== KARPENTER ======================
  { id: "karpenter-logs", category: "Karpenter", title: "View Controller Logs", description: "Tails the logs of the Karpenter controller pod.", command: "kubectl logs -f -n karpenter -l app.kubernetes.io/name=karpenter", tags: ["logs", "debugging"] },
  { id: "karpenter-nodeclaims", category: "Karpenter", title: "List NodeClaims", description: "Shows all NodeClaims provisioned by Karpenter.", command: "kubectl get nodeclaims", tags: ["nodes", "claims"] },
  { id: "karpenter-disrupt-logs", category: "Karpenter", title: "View disruption logs", description: "Filters Karpenter logs specifically for scale-down and disruption events.", command: "kubectl logs -n karpenter -l app.kubernetes.io/name=karpenter | grep -i disrupt", tags: ["scaling", "disruption", "logs"] },

  // ====================== AWS ======================
  { id: "aws-s3-sync", category: "AWS", title: "Sync local folder to S3", description: "Uploads a local directory to an S3 bucket.", command: "aws s3 sync ./my-folder s3://my-bucket-name", tags: ["s3", "sync", "upload"] },
  { id: "aws-s3-empty-bucket", category: "AWS", title: "Force empty an S3 bucket", description: "Recursively deletes all objects in an S3 bucket.", command: "aws s3 rm s3://my-bucket-name --recursive", tags: ["s3", "delete"] },
  { id: "aws-ec2-describe", category: "AWS", title: "List running EC2 instances", description: "Returns the ID, Type, and State of running EC2s.", command: "aws ec2 describe-instances --filters \"Name=instance-state-name,Values=running\" --query \"Reservations[*].Instances[*].[InstanceId,InstanceType,State.Name]\" --output table", tags: ["ec2", "inventory"] },
  { id: "aws-sts-caller", category: "AWS", title: "Check current AWS identity", description: "Verifies which AWS IAM user/role you are currently authenticated as.", command: "aws sts get-caller-identity", tags: ["iam", "auth", "sts"] },
  { id: "aws-eks-kubeconfig", category: "AWS", title: "Update EKS kubeconfig", description: "Generates or updates kubeconfig for EKS.", command: "aws eks update-kubeconfig --region <region> --name <cluster-name>", tags: ["eks", "kubernetes", "auth"] },
  { id: "aws-sso-login", category: "AWS", title: "Login via AWS SSO", description: "Authenticates via AWS IAM Identity Center (SSO).", command: "aws sso login --profile <profile-name>", tags: ["sso", "auth", "login"] },
  { id: "aws-ecr-login", category: "AWS", title: "Docker login to ECR", description: "Gets a token and pipes it to docker login for AWS ECR.", command: "aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account_id>.dkr.ecr.<region>.amazonaws.com", tags: ["ecr", "docker", "auth"] },
  { id: "aws-cloudformation-drift", category: "AWS", title: "Detect CloudFormation drift", description: "Checks if actual resources have deviated from the CFN template.", command: "aws cloudformation detect-stack-drift --stack-name <stack-name>", tags: ["cloudformation", "drift", "iac"] },
  { id: "aws-s3-presigned", category: "AWS", title: "Generate S3 Presigned URL", description: "Creates a temporary URL (valid for 1 hour) to securely share an S3 object.", command: "aws s3 presign s3://my-bucket/secret.pdf --expires-in 3600", tags: ["s3", "presigned", "share"] },
  { id: "aws-logs-tail", category: "AWS", title: "Tail CloudWatch Logs", description: "Streams real-time logs from an AWS CloudWatch Log Group.", command: "aws logs tail /aws/lambda/my-function --follow", tags: ["cloudwatch", "logs", "lambda"] },
  { id: "aws-secrets-get", category: "AWS", title: "Get AWS Secret", description: "Fetches the plain text value of a secret from AWS Secrets Manager.", command: "aws secretsmanager get-secret-value --secret-id MySecret --query SecretString --output text", tags: ["secretsmanager", "security", "secrets"] },
  { id: "aws-iam-list-keys", category: "AWS", title: "List stale IAM Access Keys", description: "Lists all access keys for a user to identify old keys needing rotation.", command: "aws iam list-access-keys --user-name <username>", tags: ["iam", "keys", "security"] },

  // ====================== LINUX ======================
  { id: "linux-find-large", category: "Linux", title: "Find top 10 largest directories", description: "Lists the top 10 largest directories in current path.", command: "du -hs * | sort -rh | head -10", tags: ["disk", "storage", "du"] },
  { id: "linux-find-large-files", category: "Linux", title: "Find files > 100MB", description: "Searches the filesystem for files exceeding 100MB.", command: "find / -type f -size +100M -exec ls -lh {} \\; | awk '{ print $9 \": \" $5 }'", tags: ["disk", "files", "find"] },
  { id: "linux-systemd-logs", category: "Linux", title: "Tail systemd service logs", description: "Follows journalctl logs for a service in real-time.", command: "journalctl -u <service-name> -f", tags: ["logs", "systemd"] },
  { id: "linux-kill-port", category: "Linux", title: "Kill process on specific port", description: "Forcefully kills the PID listening on a port.", command: "kill -9 $(lsof -t -i:<port_number>)", tags: ["process", "port", "kill"] },
  { id: "linux-cpu-hog", category: "Linux", title: "Find CPU hogging processes", description: "Lists the top 10 processes consuming the most CPU.", command: "ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head -11", tags: ["cpu", "performance", "ps"] },
  { id: "linux-grep-recursive", category: "Linux", title: "Search string recursively", description: "Searches for a string inside all files in a directory.", command: "grep -rnw '/path/to/somewhere/' -e 'pattern'", tags: ["search", "grep", "files"] },
  { id: "linux-symlink", category: "Linux", title: "Create soft symlink", description: "Creates a symbolic link pointing to a target file or directory.", command: "ln -s /path/to/target /path/to/link", tags: ["files", "symlink", "link"] },
  { id: "linux-chmod-dirs", category: "Linux", title: "Chmod ONLY directories", description: "Recursively changes permissions of directories only (leaving files untouched).", command: "find . -type d -exec chmod 755 {} \\;", tags: ["permissions", "chmod", "directories"] },
  { id: "ansible-ping", category: "Linux", title: "Ping all Ansible hosts", description: "Verifies connectivity and python availability on all inventory hosts.", command: "ansible all -m ping -i inventory.ini", tags: ["ansible", "ping", "connectivity"] },
  { id: "ansible-playbook-dryrun", category: "Linux", title: "Ansible Playbook Dry Run", description: "Runs a playbook in check mode to see what would change without actually changing anything.", command: "ansible-playbook playbook.yml --check --diff", tags: ["ansible", "playbook", "dry-run"] },
  { id: "ansible-gather-facts", category: "Linux", title: "Gather facts from host", description: "Collects system information (facts) from a specific host.", command: "ansible <hostname> -m setup", tags: ["ansible", "facts", "system"] },
  { id: "linux-awk-column", category: "Linux", title: "Extract specific column with AWK", description: "Prints only the 3rd and 5th columns of a space-separated file.", command: "awk '{print $3, $5}' data.txt", tags: ["awk", "text", "processing"] },
  { id: "linux-sed-replace", category: "Linux", title: "Find and Replace with SED", description: "Replaces 'old-string' with 'new-string' inline in a file.", command: "sed -i 's/old-string/new-string/g' config.yaml", tags: ["sed", "replace", "text"] },
  { id: "linux-xargs-rm", category: "Linux", title: "Delete files safely with xargs", description: "Finds all .log files older than 30 days and deletes them efficiently.", command: "find /var/log -name \"*.log\" -mtime +30 -print0 | xargs -0 rm -f", tags: ["xargs", "find", "cleanup"] },
  { id: "linux-rsync", category: "Linux", title: "Sync directories securely", description: "Uses rsync to synchronize two directories over SSH, showing progress.", command: "rsync -avz --progress /local/dir/ user@remote:/remote/dir/", tags: ["rsync", "sync", "ssh"] },

  // ====================== NETWORKING ======================
  { id: "linux-netstat", category: "Networking", title: "List active listening ports", description: "Shows active TCP/UDP listening ports.", command: "sudo netstat -tulnp", tags: ["ports", "network"] },
  { id: "net-curl-headers", category: "Networking", title: "Fetch HTTP headers only", description: "Fetches only the HTTP response headers.", command: "curl -I https://example.com", tags: ["http", "curl", "headers"] },
  { id: "net-dns-trace", category: "Networking", title: "Trace DNS resolution path", description: "Follows the DNS delegation path from root servers.", command: "dig +trace <domain>", tags: ["dns", "dig"] },
  { id: "net-test-port", category: "Networking", title: "Test TCP port connectivity", description: "Uses netcat to check if a remote TCP port is reachable.", command: "nc -vz <hostname> <port>", tags: ["tcp", "connectivity", "nc"] },
  { id: "net-tcpdump", category: "Networking", title: "Capture packets on port", description: "Captures and displays raw network traffic on a specific port.", command: "sudo tcpdump -i any port 80 -n -v", tags: ["tcpdump", "packets", "sniffing"] },
  { id: "net-ssl-cert", category: "Networking", title: "Check SSL cert expiry", description: "Fetches and displays the expiration date of a remote SSL certificate.", command: "echo | openssl s_client -servername example.com -connect example.com:443 2>/dev/null | openssl x509 -noout -dates", tags: ["ssl", "tls", "certificate", "openssl"] },
  { id: "linux-curl-json", category: "Networking", title: "Format JSON with jq", description: "Fetches a JSON API response and formats it nicely using jq.", command: "curl -s https://api.github.com/users/octocat | jq '.'", tags: ["curl", "jq", "json"] },
  { id: "nginx-test-config", category: "Networking", title: "Test Nginx Configuration", description: "Tests the Nginx config files for syntax errors before reloading.", command: "sudo nginx -t", tags: ["nginx", "config", "test"] },
  { id: "nginx-reload", category: "Networking", title: "Reload Nginx gracefully", description: "Reloads the Nginx configuration without dropping active connections.", command: "sudo nginx -s reload", tags: ["nginx", "reload", "graceful"] },
  { id: "nginx-access-logs", category: "Networking", title: "Monitor Nginx Access Logs", description: "Tails the Nginx access logs and uses awk to show only IPs and HTTP status.", command: "tail -f /var/log/nginx/access.log | awk '{print $1, $9}'", tags: ["nginx", "logs", "awk"] },

  // ====================== DOCKER ======================
  { id: "docker-clean-all", category: "Docker", title: "Nuke all Docker resources", description: "Stops and removes all containers, images, volumes, and networks.", command: "docker stop $(docker ps -aq) && docker system prune -a --volumes -f", tags: ["cleanup", "nuke", "prune"] },
  { id: "docker-shell", category: "Docker", title: "Open shell in running container", description: "Executes an interactive bash shell.", command: "docker exec -it <container-id> /bin/bash", tags: ["exec", "shell"] },
  { id: "docker-stats", category: "Docker", title: "Live container metrics", description: "Shows a live stream of CPU/Memory usage.", command: "docker stats", tags: ["metrics", "performance"] },
  { id: "docker-build-no-cache", category: "Docker", title: "Build image without cache", description: "Forces a completely fresh docker build bypassing all cached layers.", command: "docker build --no-cache -t <image-name>:<tag> .", tags: ["build", "cache"] },
  { id: "docker-dangling", category: "Docker", title: "Remove dangling images", description: "Removes untagged '<none>' images that take up disk space.", command: "docker rmi $(docker images -f \"dangling=true\" -q)", tags: ["cleanup", "images"] },

  // ====================== GIT ======================
  { id: "git-undo-commit", category: "Git", title: "Undo last commit (keep changes)", description: "Removes the last commit but keeps changes in working directory.", command: "git reset HEAD~1", tags: ["undo", "reset"] },
  { id: "git-force-pull", category: "Git", title: "Force overwrite local branch", description: "Discards local changes to match remote.", command: "git fetch --all && git reset --hard origin/<branch-name>", tags: ["force", "pull"] },
  { id: "git-clean-branches", category: "Git", title: "Delete merged local branches", description: "Deletes branches already merged into main.", command: "git branch --merged | egrep -v \"(^\\*|main|master)\" | xargs git branch -d", tags: ["cleanup", "branches"] },
  { id: "git-stash-pop", category: "Git", title: "Stash specific files", description: "Interactively choose which changes to stash.", command: "git stash push -p -m \"message\"", tags: ["stash", "interactive"] },
  { id: "git-squash", category: "Git", title: "Interactive rebase (Squash)", description: "Starts an interactive rebase for the last N commits.", command: "git rebase -i HEAD~3", tags: ["rebase", "squash", "history"] },
  { id: "git-cherry-pick", category: "Git", title: "Cherry pick a commit", description: "Applies the changes introduced by a specific commit from another branch.", command: "git cherry-pick <commit-hash>", tags: ["cherry-pick", "commits"] },
  { id: "gh-run-list", category: "Git", title: "List recent GH Action runs", description: "Lists the most recent GitHub Actions workflow runs (requires gh cli).", command: "gh run list --limit 5", tags: ["github", "actions", "cli"] },
  { id: "gh-run-watch", category: "Git", title: "Watch GH Action progress", description: "Follows the logs of a running GitHub Actions workflow.", command: "gh run watch", tags: ["github", "actions", "logs"] },

  // ====================== TERRAFORM ======================
  { id: "tf-plan-out", category: "Terraform", title: "Generate and save a plan", description: "Generates an execution plan to a file.", command: "terraform plan -out=tfplan", tags: ["plan", "review"] },
  { id: "tf-apply-auto", category: "Terraform", title: "Apply without confirmation", description: "Applies changes automatically.", command: "terraform apply -auto-approve", tags: ["apply", "ci-cd"] },
  { id: "tf-import", category: "Terraform", title: "Import existing resource", description: "Brings existing cloud resource under TF state.", command: "terraform import aws_instance.my_server i-1234567890", tags: ["import", "state"] },
  { id: "tf-state-rm", category: "Terraform", title: "Remove resource from state", description: "Removes a resource from state tracking without destroying the actual cloud resource.", command: "terraform state rm <resource_address>", tags: ["state", "remove", "untether"] },
  { id: "tf-force-unlock", category: "Terraform", title: "Force unlock state file", description: "Manually removes a lock on the state file if a previous pipeline crashed.", command: "terraform force-unlock <lock-id>", tags: ["state", "lock", "debug"] },

  // ====================== DATABASE ======================
  { id: "db-pg-dump", category: "Database", title: "Backup PostgreSQL database", description: "Creates a logical backup of a PostgreSQL database.", command: "pg_dump -U <username> -h <host> -d <database_name> > backup.sql", tags: ["postgres", "backup"] },
  { id: "db-mysql-import", category: "Database", title: "Import MySQL database", description: "Imports an SQL file into a MySQL database.", command: "mysql -u <username> -p <database_name> < backup.sql", tags: ["mysql", "import", "restore"] },
  { id: "db-redis-flush", category: "Database", title: "Flush all Redis keys", description: "Connects to redis-cli and deletes all keys in all databases.", command: "redis-cli flushall", tags: ["redis", "cache", "flush"] },
  { id: "elk-cluster-health", category: "Database", title: "Check Elasticsearch Health", description: "Fetches the current health status of the ES cluster.", command: "curl -X GET \"localhost:9200/_cluster/health?pretty\"", tags: ["elasticsearch", "elk", "health"] },
  { id: "elk-list-indices", category: "Database", title: "List Elasticsearch Indices", description: "Shows all indices in the ES cluster with their health, status, and size.", command: "curl -X GET \"localhost:9200/_cat/indices?v\"", tags: ["elasticsearch", "elk", "indices"] },
  { id: "elk-delete-index", category: "Database", title: "Delete Elasticsearch Index", description: "Permanently deletes a specific index (use with caution).", command: "curl -X DELETE \"localhost:9200/my-index-name\"", tags: ["elasticsearch", "elk", "delete"] },

  // ====================== SECURITY / DEBUGGING ======================
  { id: "debug-strace", category: "Debugging", title: "Trace system calls of a process", description: "Prints out all system calls a PID makes (crucial for deep debugging).", command: "strace -p <pid>", tags: ["strace", "syscalls"] },
  { id: "sec-ssh-tunnel", category: "Security", title: "Create SSH tunnel (Local Port Forward)", description: "Tunnels local port 8080 securely to remote port 80 via a bastion host.", command: "ssh -L 8080:localhost:80 user@bastion-host.com", tags: ["ssh", "tunnel", "forwarding"] },
  { id: "sec-generate-ssh", category: "Security", title: "Generate ED25519 SSH Key", description: "Generates a highly secure modern SSH key pair.", command: "ssh-keygen -t ed25519 -C \"your_email@example.com\"", tags: ["ssh", "keygen", "keys"] },
  { id: "debug-tar-gz", category: "Debugging", title: "Extract tar.gz archive", description: "Extracts a compressed tarball archive to the current directory.", command: "tar -xzvf archive.tar.gz", tags: ["tar", "unzip", "archive"] },
  { id: "promql-cpu-usage", category: "Debugging", title: "PromQL: Pod CPU Usage", description: "Calculates the rate of CPU usage per pod over a 5-minute window.", command: "rate(container_cpu_usage_seconds_total{namespace=\"default\"}[5m])", tags: ["prometheus", "promql", "metrics", "cpu"] },
  { id: "promql-memory-usage", category: "Debugging", title: "PromQL: Pod Memory Usage", description: "Gets the current memory usage of pods in megabytes.", command: "container_memory_usage_bytes{namespace=\"default\"} / 1024 / 1024", tags: ["prometheus", "promql", "metrics", "memory"] },
  { id: "grafana-restart", category: "Debugging", title: "Restart Grafana Server", description: "Restarts the grafana systemd service.", command: "sudo systemctl restart grafana-server", tags: ["grafana", "systemd", "restart"] },
  { id: "ssl-generate-csr", category: "Security", title: "Generate CSR & Private Key", description: "Creates a new 2048-bit RSA private key and a Certificate Signing Request.", command: "openssl req -new -newkey rsa:2048 -nodes -keyout mydomain.key -out mydomain.csr", tags: ["ssl", "openssl", "csr", "keygen"] },
  { id: "ssl-check-cert", category: "Security", title: "Check local SSL Certificate", description: "Reads an x509 certificate file and outputs its details.", command: "openssl x509 -in certificate.crt -text -noout", tags: ["ssl", "openssl", "verify"] },

  // ====================== GCP (GOOGLE CLOUD) ======================
  { id: "gcp-auth-login", category: "GCP", title: "Authenticate with Google Cloud", description: "Authorizes the gcloud CLI to access Google Cloud Platform with your user credentials.", command: "gcloud auth login", tags: ["gcp", "auth", "login"] },
  { id: "gcp-set-project", category: "GCP", title: "Set Active GCP Project", description: "Sets the default project ID for all subsequent gcloud commands.", command: "gcloud config set project <project-id>", tags: ["gcp", "project", "config"] },
  { id: "gcp-gke-credentials", category: "GCP", title: "Get GKE Cluster Credentials", description: "Fetches cluster credentials for Google Kubernetes Engine and updates your local kubeconfig.", command: "gcloud container clusters get-credentials <cluster-name> --region <region>", tags: ["gcp", "gke", "kubernetes"] },
  { id: "gcp-compute-instances", category: "GCP", title: "List GCE VM Instances", description: "Lists all Google Compute Engine instances in the active project.", command: "gcloud compute instances list", tags: ["gcp", "compute", "vms"] },
  { id: "gcp-compute-ssh", category: "GCP", title: "SSH into GCE Instance", description: "Securely connects to a Compute Engine virtual machine via Identity-Aware Proxy (IAP).", command: "gcloud compute ssh <instance-name> --zone <zone> --tunnel-through-iap", tags: ["gcp", "ssh", "iap", "compute"] },
  { id: "gcp-iam-policy", category: "GCP", title: "Get Project IAM Policy", description: "Fetches the complete IAM policy (roles and members) bound to the current project.", command: "gcloud projects get-iam-policy <project-id>", tags: ["gcp", "iam", "security"] },
  { id: "gcp-gsutil-rsync", category: "GCP", title: "Sync local folder to GCS Bucket", description: "Synchronizes the contents of a local directory to a Google Cloud Storage bucket.", command: "gsutil -m rsync -r ./my-folder gs://my-gcs-bucket", tags: ["gcp", "storage", "gcs", "sync"] },
  { id: "gcp-gsutil-size", category: "GCP", title: "Calculate GCS Bucket Size", description: "Calculates the total size and number of objects in a Cloud Storage bucket.", command: "gsutil du -sh gs://my-gcs-bucket", tags: ["gcp", "storage", "gcs", "size"] },
  { id: "gcp-bq-query", category: "GCP", title: "Run BigQuery SQL", description: "Executes a standard SQL query directly against BigQuery from the command line.", command: "bq query --use_legacy_sql=false 'SELECT * FROM `project.dataset.table` LIMIT 10'", tags: ["gcp", "bigquery", "sql", "data"] },
  { id: "gcp-cloud-run-deploy", category: "GCP", title: "Deploy to Cloud Run", description: "Deploys a container image to Cloud Run as a fully managed serverless service.", command: "gcloud run deploy <service-name> --image <gcr.io/image-path> --region <region> --allow-unauthenticated", tags: ["gcp", "serverless", "deploy", "cloud-run"] },
  { id: "gcp-secrets-access", category: "GCP", title: "Access Secret Manager Value", description: "Retrieves the decoded payload of a secret stored in GCP Secret Manager.", command: "gcloud secrets versions access latest --secret=\"<secret-name>\"", tags: ["gcp", "secrets", "security"] },
  { id: "gcp-pubsub-publish", category: "GCP", title: "Publish Pub/Sub Message", description: "Publishes a test message to a Cloud Pub/Sub topic.", command: "gcloud pubsub topics publish <topic-name> --message=\"Hello World\"", tags: ["gcp", "pubsub", "messaging"] },
  { id: "gcp-network-list", category: "GCP", title: "List VPC Networks", description: "Lists all VPC networks and their subnet modes in the project.", command: "gcloud compute networks list", tags: ["gcp", "vpc", "network"] },

  // ====================== ADDITIONAL COMPREHENSIVE COMMANDS ======================
  // Kubernetes Deep Dives
  { id: "k8s-rollout-history", category: "Kubernetes", title: "View Rollout History", description: "Checks the revision history of a deployment.", command: "kubectl rollout history deployment/<name>", tags: ["k8s", "rollout", "history"] },
  { id: "k8s-get-yaml", category: "Kubernetes", title: "Get Running Pod YAML", description: "Exports the live YAML configuration of a running pod.", command: "kubectl get pod <pod-name> -o yaml", tags: ["k8s", "yaml", "export"] },
  { id: "k8s-patch", category: "Kubernetes", title: "Patch Resource Inline", description: "Updates a field on a resource without an editor.", command: "kubectl patch deployment <name> -p '{\"spec\": {\"replicas\": 3}}'", tags: ["k8s", "patch", "update"] },
  
  // Helm Additions
  { id: "helm-upgrade-install", category: "Helm", title: "Upgrade or Install Release", description: "Installs a helm chart, or upgrades it if it already exists.", command: "helm upgrade --install <release-name> <chart-path>", tags: ["helm", "deploy", "upgrade"] },
  { id: "helm-template", category: "Helm", title: "Render Helm Templates locally", description: "Renders the chart templates locally without applying them to the cluster.", command: "helm template <release-name> <chart-path>", tags: ["helm", "template", "dry-run"] },
  
  // AWS Extensions
  { id: "aws-s3-cp", category: "AWS", title: "Copy File to S3", description: "Copies a single local file to an S3 bucket.", command: "aws s3 cp local-file.txt s3://my-bucket/", tags: ["aws", "s3", "copy"] },
  { id: "aws-lambda-invoke", category: "AWS", title: "Invoke Lambda Function", description: "Synchronously invokes a Lambda function from the CLI.", command: "aws lambda invoke --function-name my-function --payload '{}' response.json", tags: ["aws", "lambda", "invoke"] },
  { id: "aws-rds-describe", category: "AWS", title: "List RDS Instances", description: "Gets a list of all RDS database instances.", command: "aws rds describe-db-instances --query 'DBInstances[*].[DBInstanceIdentifier,DBInstanceStatus]'", tags: ["aws", "rds", "database"] },

  // GCP Extensions
  { id: "gcp-adc-login", category: "GCP", title: "Setup Application Default Credentials", description: "Authenticates your local environment so code can use GCP APIs natively.", command: "gcloud auth application-default login", tags: ["gcp", "auth", "adc"] },
  { id: "gcp-run-services", category: "GCP", title: "List Cloud Run Services", description: "Lists all deployed Cloud Run services in the active project.", command: "gcloud run services list", tags: ["gcp", "cloud-run", "serverless"] },

  // Advanced Linux Administration
  { id: "linux-free-mem", category: "Linux", title: "Check Free Memory", description: "Displays total, used, and free memory in human-readable megabytes/gigabytes.", command: "free -hm", tags: ["linux", "memory", "ram"] },
  { id: "linux-df", category: "Linux", title: "Check Disk Space", description: "Shows filesystem disk space usage and types.", command: "df -Th", tags: ["linux", "disk", "storage"] },
  { id: "linux-find-chown", category: "Linux", title: "Find and Change Owner", description: "Finds files owned by root and changes them to another user.", command: "find /path -user root -exec chown user:group {} +", tags: ["linux", "chown", "permissions"] },
  { id: "linux-tar-czf", category: "Linux", title: "Create tar.gz Archive", description: "Compresses a directory into a tarball.", command: "tar -czvf archive.tar.gz /path/to/dir", tags: ["linux", "tar", "compress"] },

  // Networking Deep Dives
  { id: "net-ip-route", category: "Networking", title: "Check IP Routing", description: "Determines exactly which interface and route will be used to reach an IP.", command: "ip route get 8.8.8.8", tags: ["networking", "route", "ip"] },
  { id: "net-ping-interface", category: "Networking", title: "Ping via Specific Interface", description: "Forces ping to use a specific network interface.", command: "ping -I eth1 8.8.8.8", tags: ["networking", "ping", "interface"] },

  // Docker Compose & Advanced
  { id: "docker-compose-up", category: "Docker", title: "Docker Compose Up Detached", description: "Starts all services defined in a docker-compose.yml in the background.", command: "docker compose up -d", tags: ["docker", "compose", "daemon"] },
  { id: "docker-inspect-ip", category: "Docker", title: "Get Container IP", description: "Extracts the internal IP address of a running docker container.", command: "docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container-id>", tags: ["docker", "inspect", "ip"] },
  { id: "docker-logs-follow", category: "Docker", title: "Follow Container Logs", description: "Tails the logs of a docker container continuously.", command: "docker logs -f <container-id>", tags: ["docker", "logs", "tail"] },

  // Git Power Moves
  { id: "git-fetch-prune", category: "Git", title: "Fetch and Prune Remote Branches", description: "Fetches updates and removes local tracking branches that were deleted on remote.", command: "git fetch -p", tags: ["git", "fetch", "prune"] },
  { id: "git-rebase-origin", category: "Git", title: "Rebase onto Origin Main", description: "Fetches and immediately rebases your current branch onto the latest origin/main.", command: "git pull --rebase origin main", tags: ["git", "rebase", "sync"] },
  { id: "git-tag-release", category: "Git", title: "Create Annotated Tag", description: "Creates a version tag with a message.", command: "git tag -a v1.0.0 -m 'Release v1.0.0'", tags: ["git", "tag", "release"] },

  // Terraform Pro Tricks
  { id: "tf-init-upgrade", category: "Terraform", title: "Init and Upgrade Providers", description: "Initializes terraform and upgrades all providers to their latest allowed versions.", command: "terraform init -upgrade", tags: ["terraform", "init", "providers"] },
  { id: "tf-workspace-list", category: "Terraform", title: "List Terraform Workspaces", description: "Shows all available state workspaces.", command: "terraform workspace list", tags: ["terraform", "workspace", "state"] },

  // Database Mastery
  { id: "db-pg-restore", category: "Database", title: "Restore PostgreSQL Database", description: "Restores a database from a pg_dump file.", command: "pg_restore -U <username> -d <dbname> -1 backup.sql", tags: ["postgres", "restore", "db"] },
  { id: "db-mysql-dump", category: "Database", title: "Backup MySQL Database", description: "Dumps a MySQL database to an SQL script.", command: "mysqldump -u <username> -p <dbname> > backup.sql", tags: ["mysql", "dump", "backup"] },

  // CI/CD Utilities
  { id: "cicd-act", category: "CI/CD", title: "Run GitHub Actions Locally", description: "Uses nektos/act to run your github actions locally via docker.", command: "act -l", tags: ["github-actions", "act", "local"] },
  
  // Security Auditing
  { id: "sec-nmap", category: "Security", title: "Scan Open Ports with Nmap", description: "Performs a fast network scan to find open ports on a target IP.", command: "nmap -F 192.168.1.1", tags: ["nmap", "scan", "ports"] },
  { id: "sec-chmod-ssh", category: "Security", title: "Fix SSH Key Permissions", description: "Secures a private SSH key file so only the owner can read it.", command: "chmod 600 ~/.ssh/id_rsa", tags: ["ssh", "permissions", "security"] }
];
