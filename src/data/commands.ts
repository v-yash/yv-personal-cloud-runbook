export type Category = "AWS" | "Linux" | "Networking" | "Kubernetes" | "Karpenter" | "Debugging" | "Docker" | "Git" | "Terraform" | "Database";

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
  // KUBERNETES
  {
    id: "k8s-get-pods-all",
    category: "Kubernetes",
    title: "Get all pods in all namespaces",
    description: "Lists all pods across all namespaces in the cluster, useful for a quick cluster overview.",
    command: "kubectl get pods --all-namespaces",
    tags: ["pods", "overview"]
  },
  {
    id: "k8s-events-sort",
    category: "Kubernetes",
    title: "Sort events by timestamp",
    description: "Get recent events in a namespace sorted by their creation time to trace what just happened.",
    command: "kubectl get events --sort-by='.metadata.creationTimestamp'",
    tags: ["events", "debugging", "cluster"]
  },
  {
    id: "k8s-top-nodes",
    category: "Kubernetes",
    title: "Check node resource usage",
    description: "Displays CPU and Memory usage for all nodes in the cluster (requires metrics-server).",
    command: "kubectl top nodes",
    sampleOutput: "NAME      CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%\nnode-1    100m         5%     1200Mi          15%",
    tags: ["metrics", "nodes", "performance"]
  },
  {
    id: "k8s-force-delete-pod",
    category: "Kubernetes",
    title: "Force delete a stuck pod",
    description: "Bypasses graceful termination to immediately kill a pod stuck in Terminating state.",
    command: "kubectl delete pod <pod-name> --grace-period=0 --force",
    tags: ["pods", "stuck", "delete"]
  },
  {
    id: "k8s-port-forward",
    category: "Kubernetes",
    title: "Port forward to a service",
    description: "Forwards a local port to a port on a Kubernetes service for local debugging.",
    command: "kubectl port-forward svc/<service-name> 8080:80",
    tags: ["network", "debug", "service"]
  },
  {
    id: "k8s-decode-secret",
    category: "Kubernetes",
    title: "Decode a base64 Kubernetes secret",
    description: "Fetches a secret and decodes its base64 payload instantly in the terminal.",
    command: "kubectl get secret <secret-name> -o jsonpath='{.data.<key>}' | base64 --decode",
    tags: ["security", "secrets", "base64"]
  },
  
  // KARPENTER
  {
    id: "karpenter-logs",
    category: "Karpenter",
    title: "View Karpenter Controller Logs",
    description: "Tails the logs of the Karpenter controller pod to debug provisioning issues.",
    command: "kubectl logs -f -n karpenter -l app.kubernetes.io/name=karpenter",
    tags: ["logs", "debugging", "provisioning"]
  },
  {
    id: "karpenter-nodeclaims",
    category: "Karpenter",
    title: "List Karpenter NodeClaims",
    description: "Shows all NodeClaims provisioned by Karpenter and their current status.",
    command: "kubectl get nodeclaims",
    tags: ["nodes", "claims", "autoscaling"]
  },

  // AWS
  {
    id: "aws-s3-sync",
    category: "AWS",
    title: "Sync local folder to S3",
    description: "Uploads a local directory to an S3 bucket, syncing only the changed files.",
    command: "aws s3 sync ./my-folder s3://my-bucket-name",
    tags: ["s3", "sync", "upload"]
  },
  {
    id: "aws-s3-empty-bucket",
    category: "AWS",
    title: "Force empty an S3 bucket",
    description: "Recursively deletes all objects in an S3 bucket (use with extreme caution).",
    command: "aws s3 rm s3://my-bucket-name --recursive",
    tags: ["s3", "delete", "cleanup"]
  },
  {
    id: "aws-ec2-describe",
    category: "AWS",
    title: "List all running EC2 instances",
    description: "Returns the Instance ID, Type, and State of all running EC2 instances.",
    command: "aws ec2 describe-instances --filters \"Name=instance-state-name,Values=running\" --query \"Reservations[*].Instances[*].[InstanceId,InstanceType,State.Name]\" --output table",
    tags: ["ec2", "instances", "inventory"]
  },
  {
    id: "aws-sts-caller",
    category: "AWS",
    title: "Check current AWS identity",
    description: "Verifies which AWS IAM user or role you are currently authenticated as.",
    command: "aws sts get-caller-identity",
    sampleOutput: "{\n    \"UserId\": \"AROA...\",\n    \"Account\": \"123456789012\",\n    \"Arn\": \"arn:aws:iam::123456789012:user/yash\"\n}",
    tags: ["iam", "auth", "sts"]
  },
  {
    id: "aws-eks-kubeconfig",
    category: "AWS",
    title: "Update EKS kubeconfig",
    description: "Generates or updates your kubeconfig file to allow kubectl access to an EKS cluster.",
    command: "aws eks update-kubeconfig --region <region> --name <cluster-name>",
    tags: ["eks", "kubernetes", "auth"]
  },

  // LINUX
  {
    id: "linux-find-large",
    category: "Linux",
    title: "Find top 10 largest directories",
    description: "Calculates the size of directories in the current path and lists the top 10 largest ones.",
    command: "du -hs * | sort -rh | head -10",
    sampleOutput: "4.0G    node_modules\n1.2G    .git",
    tags: ["disk", "storage", "du"]
  },
  {
    id: "linux-find-large-files",
    category: "Linux",
    title: "Find files larger than 100MB",
    description: "Searches the entire filesystem for files exceeding 100MB in size.",
    command: "find / -type f -size +100M -exec ls -lh {} \\; | awk '{ print $9 \": \" $5 }'",
    tags: ["disk", "files", "find"]
  },
  {
    id: "linux-systemd-logs",
    category: "Linux",
    title: "Tail systemd service logs",
    description: "Follows the journalctl logs for a specific systemd service in real-time.",
    command: "journalctl -u <service-name> -f",
    tags: ["logs", "systemd", "services"]
  },
  {
    id: "linux-kill-port",
    category: "Linux",
    title: "Kill process occupying a port",
    description: "Finds the PID of the process using a specific port and forcefully kills it.",
    command: "kill -9 $(lsof -t -i:<port_number>)",
    tags: ["process", "port", "kill"]
  },

  // NETWORKING
  {
    id: "linux-netstat",
    category: "Networking",
    title: "List active listening ports",
    description: "Shows all active TCP/UDP listening ports and their associated process IDs.",
    command: "sudo netstat -tulnp",
    sampleOutput: "tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      890/sshd",
    tags: ["ports", "network", "listening"]
  },
  {
    id: "net-curl-headers",
    category: "Networking",
    title: "Fetch HTTP headers only",
    description: "Uses curl to fetch and display only the HTTP response headers (useful for debugging CORS/Cache).",
    command: "curl -I https://example.com",
    tags: ["http", "curl", "headers"]
  },
  {
    id: "net-dns-trace",
    category: "Networking",
    title: "Trace DNS resolution path",
    description: "Follows the DNS delegation path from root servers down to the authoritative nameserver.",
    command: "dig +trace <domain>",
    tags: ["dns", "dig", "troubleshooting"]
  },
  {
    id: "net-test-port",
    category: "Networking",
    title: "Test TCP port connectivity",
    description: "Uses netcat to check if a remote TCP port is open and reachable.",
    command: "nc -vz <hostname> <port>",
    sampleOutput: "Connection to example.com port 443 [tcp/https] succeeded!",
    tags: ["tcp", "connectivity", "nc"]
  },

  // DOCKER
  {
    id: "docker-clean-all",
    category: "Docker",
    title: "Nuke all Docker resources",
    description: "Stops all containers and removes all containers, images, volumes, and networks.",
    command: "docker stop $(docker ps -aq) && docker system prune -a --volumes -f",
    tags: ["cleanup", "nuke", "prune"]
  },
  {
    id: "docker-shell",
    category: "Docker",
    title: "Open shell in running container",
    description: "Executes an interactive bash shell inside a running container.",
    command: "docker exec -it <container-id> /bin/bash",
    tags: ["exec", "shell", "interactive"]
  },
  {
    id: "docker-stats",
    category: "Docker",
    title: "Live container metrics",
    description: "Shows a live stream of CPU, memory, and network usage for all running containers.",
    command: "docker stats",
    tags: ["metrics", "performance", "cpu"]
  },

  // GIT
  {
    id: "git-undo-commit",
    category: "Git",
    title: "Undo last commit (keep changes)",
    description: "Removes the last commit from history but keeps the modified files in your working directory.",
    command: "git reset HEAD~1",
    tags: ["undo", "reset", "commit"]
  },
  {
    id: "git-force-pull",
    category: "Git",
    title: "Force overwrite local branch",
    description: "Discards all local changes and commits, forcing your local branch to perfectly match the remote.",
    command: "git fetch --all && git reset --hard origin/<branch-name>",
    tags: ["force", "pull", "reset"]
  },
  {
    id: "git-clean-branches",
    category: "Git",
    title: "Delete merged local branches",
    description: "Finds all branches that have already been merged into main and deletes them locally.",
    command: "git branch --merged | egrep -v \"(^\\*|main|master)\" | xargs git branch -d",
    tags: ["cleanup", "branches", "maintenance"]
  },

  // TERRAFORM
  {
    id: "tf-plan-out",
    category: "Terraform",
    title: "Generate and save a plan",
    description: "Generates an execution plan and saves it to a file for review before applying.",
    command: "terraform plan -out=tfplan",
    tags: ["plan", "review"]
  },
  {
    id: "tf-apply-auto",
    category: "Terraform",
    title: "Apply without confirmation",
    description: "Applies changes automatically without prompting for a 'yes' (useful in CI/CD).",
    command: "terraform apply -auto-approve",
    tags: ["apply", "ci-cd", "automation"]
  },
  {
    id: "tf-import",
    category: "Terraform",
    title: "Import existing resource",
    description: "Brings an existing cloud resource under Terraform state management.",
    command: "terraform import aws_instance.my_server i-1234567890abcdef0",
    tags: ["import", "state", "migration"]
  },
  
  // DATABASE / DEBUGGING
  {
    id: "db-pg-dump",
    category: "Database",
    title: "Backup PostgreSQL database",
    description: "Creates a logical backup of a PostgreSQL database to a local file.",
    command: "pg_dump -U <username> -h <host> -d <database_name> > backup.sql",
    tags: ["postgres", "backup", "dump"]
  },
  {
    id: "debug-strace",
    category: "Debugging",
    title: "Trace system calls of a process",
    description: "Attaches to a running PID and prints out all system calls it makes (crucial for deep debugging).",
    command: "strace -p <pid>",
    tags: ["strace", "syscalls", "advanced"]
  }
];
