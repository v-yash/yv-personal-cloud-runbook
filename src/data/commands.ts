export type Category = "AWS" | "Linux" | "Networking" | "Kubernetes" | "Karpenter" | "Debugging" | "Docker" | "Git";

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
  {
    id: "k8s-get-pods",
    category: "Kubernetes",
    title: "Get all pods in all namespaces",
    description: "Lists all pods across all namespaces in the cluster, useful for a quick cluster overview.",
    command: "kubectl get pods --all-namespaces",
    tags: ["pods", "overview"]
  },
  {
    id: "aws-s3-sync",
    category: "AWS",
    title: "Sync local folder to S3",
    description: "Uploads a local directory to an S3 bucket, syncing only the changed files.",
    command: "aws s3 sync ./my-folder s3://my-bucket-name",
    sampleOutput: "upload: ./my-folder/file.txt to s3://my-bucket-name/file.txt",
    tags: ["s3", "sync", "upload"]
  },
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
    id: "karpenter-logs",
    category: "Karpenter",
    title: "View Karpenter Controller Logs",
    description: "Tails the logs of the Karpenter controller pod to debug provisioning issues.",
    command: "kubectl logs -f -n karpenter -l app.kubernetes.io/name=karpenter",
    tags: ["logs", "debugging", "provisioning"]
  },
  {
    id: "linux-netstat",
    category: "Networking",
    title: "List listening ports",
    description: "Shows all active listening ports and their associated process IDs on a Linux machine.",
    command: "sudo netstat -tulnp",
    sampleOutput: "tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      890/sshd",
    tags: ["ports", "network", "listening"]
  }
];
