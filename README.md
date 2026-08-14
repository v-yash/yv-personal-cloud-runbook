# ☁️ Cloud Runbook

A premium, searchable reference for **DevOps, SRE, and Cloud Infrastructure** commands.

**250+ battle-tested commands** across 16 categories including Kubernetes, AWS, GCP, Docker, Terraform, Ansible, Monitoring, and more.

## 🔗 Live Site

**[v-yash.github.io/yv-personal-cloud-runbook](https://v-yash.github.io/yv-personal-cloud-runbook/)**

## ✨ Features

- 🔍 **Instant search** across titles, descriptions, commands, and tags
- 📂 **16 categories** with badge counts
- 📋 **One-click copy** to clipboard
- 🌌 **Animated particle background** via particles.js
- 🎨 **Glassmorphism cards** with category-colored accents
- 📱 **Responsive** sidebar with mobile menu
- ⚡ **Zero build step** — pure HTML/CSS/JS, deployed directly to GitHub Pages

## 🗂️ Categories

| Category | Commands |
|----------|----------|
| Kubernetes | 25 |
| AWS | 25 |
| GCP | 25 |
| Linux | 25 |
| Docker | 15 |
| Git | 15 |
| Terraform | 15 |
| Networking | 18 |
| Database | 15 |
| Security | 12 |
| Helm | 10 |
| CI/CD | 12 |
| Ansible | 10 |
| Monitoring | 12 |
| Karpenter | 6 |
| Debugging | 12 |

## 🚀 Adding Commands

Edit `script.js` and add entries to the `commands` array:

```js
{ 
  id: "unique-id", 
  category: "Kubernetes", 
  title: "My Command", 
  description: "What it does.", 
  command: "kubectl ...", 
  tags: ["tag1", "tag2"] 
}
```

Push to `main` — GitHub Actions deploys automatically.

## 📄 License

MIT
