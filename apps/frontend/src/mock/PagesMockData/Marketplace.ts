import type { TemplateCard, FilterCategory } from "types";

export const marketplaceTemplates: TemplateCard[] = [
  {
    id: "1",
    title: "React + AWS S3 Optimized",
    author: {
      address: "0x71C...4f9",
      reputation: 98,
      avatar: "from-blue-500 to-purple-600"
    },
    price: "0.05 ETH",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPfj5AFDUu3dgRngxW1OAMu3DsJ5XZCrYj-FRfQQOd4vArAzfTQbBoZyteL1poFvMX0Zf8eogNqO9ADKRYzDF0z6SyMRX4k58gUIArr-3488zulWbtYzWH2yHIFUqepk_UqQekPM4aTur8yJwCbx-feIb4vAcVXKW5S6fIKOOS6O6kNxWcEVJXkBXU8UtpoS_jwKyOR84mEWgV-sM22wggAEKj78PHPMkBbZEfae8xPsUVjDEfKF_HvyfS2co1neNCKqF_X3x2gqA",
    verified: true,
    tags: ["Dockerized", "Zero-trust", "Cloudfront"]
  },
  {
    id: "2",
    title: "Node.js + K8s Security Hardened",
    author: {
      address: "0x92A...2c1",
      reputation: 124,
      avatar: "from-red-500 to-orange-500"
    },
    price: "0.08 ETH",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8as21V9AnBIO6_3aHI5K9ktYLiHdzXeEK2ja8W81UxIfFPTEZgeeBk1MAnUasSI9obpVQQxSez_pmvJzMzP5ml97vzhqBLH-bAFVp2iMoMm1q2fwVBLO_vQQZDTWAZf-CPR3pFHjkx5t-6sKAYF6BQHpLuprod4RjIj2e-wxtNg4sl9nl5PPS8wr4e9bmGZQbYwJhcYtozP7WWE6gJnoS2u582t-qRoQilDy1wtFjUjkxjzNVxiSQvYCt1DJHPnRtHPqwi8rsS84",
    verified: true,
    tags: ["Prometheus", "K8s", "RBAC"]
  },
  {
    id: "3",
    title: "Go Ethereum Node Deployer",
    author: {
      address: "0x14D...8e2",
      reputation: 245,
      avatar: "from-green-500 to-teal-500"
    },
    price: "0.12 ETH",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ_oiOcGC9Xm46bfx6oO1fr-iOlh9piFQtNWbgVqdGmUswT_TYD302DrDSxn5M_0-gT59ovxYAQ9ZJcYKIY6tRzkbXsz5IRpfyB34IlevsiVHdYa2ZxVkJBWD3yy0Vj-RgLzuVo49DNz57Wd7OAlF0m7rT0AoQV_8b14LdVCsmBjjcBRaAC2d6KXm_wklE1FNGKLwP8FP33E4-60J0l3Ogu4RYkUEKiMuS4z_OJFiJnt2-IwYve3QVU1A1KlN6OoiFxwZdLuwW6rw",
    verified: true,
    tags: ["Geth", "Lighthouse", "P2P"]
  },
  {
    id: "4",
    title: "Python ML Pipeline (IPFS)",
    author: {
      address: "0x33B...2d5",
      reputation: 56,
      avatar: "from-yellow-500 to-orange-600"
    },
    price: "0.04 ETH",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDq2M66febzu9XRKiHABCucHyWg8IXAeVh4oLQYyxTwzwZ6kuin8eCiijD-y-5TRNEml2GKyvoBhKf-zj0gDckNu9daWcgSvX57hvBOUNypuh2qiZYVIYY5Oj3MZ33u5ZbdTkA91WZaxcbFZjw1-hVe7u3sWbyq2Jkro4V3tvh16pACsH9tEGbj1PYP72iQYPbZeI1oCQLC2rZOo2BXwoTYw_uuewY3Q6py9x0dtddtczRaO0iSR4BltfTD0eH4oPB-wlz2H3oyQA",
    verified: true,
    tags: ["Jupyter", "IPFS", "PyTorch"]
  },
  {
    id: "5",
    title: "Azure Enterprise CI/CD",
    author: {
      address: "0xBE3...9a4",
      reputation: 412,
      avatar: "from-indigo-500 to-purple-800"
    },
    price: "0.15 ETH",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQgpozsXesHL54LR7iO30bfD8LshuluFmVSqfrsw1vMxg5u_oct5W0oxSZIi2QyBd9gmL43WbUdnRmedQyatApJ20z7tnYndc_ZDNq6UH6izzDBhmZfGtIuVJtFDSYwvohJrLr8kk6GIpuaWammerc2OdoAIzCQpENbCm7RvkAcxKE_j7yx5Wc5oQthTaSyatZm39Auet8ntlxNlW2Lldn5Hk8pMd21Z8ZPhduZ7mALGBZsoaZ7QXRjYABuLLzhAUgd_Mlvp6rIpk",
    verified: true,
    tags: ["AD Join", "Terraform", "Bicep"]
  },
  {
    id: "6",
    title: "IPFS + ENS Static Site",
    author: {
      address: "0x4F2...1c0",
      reputation: 82,
      avatar: "from-pink-500 to-rose-400"
    },
    price: "0.02 ETH",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRjCAPTdTsqnQj60PJMQ7dm1AQ8tCOW-kHWUmOsNvBSVt3iwh9LB5FDh8P04wyJA4gKQeuTLrgKCVxRosH3hh-Js-8i4aiiUVbkQ-8r76wtI4RfWy9hLlRlseFPPoLCXhVf0UxwAgU5xAEbD6MMW-XPeduoUMK8sFm9wpfCQEOYAeSn0Rpd-FRkPDjcjJzVKjVF67_x3Pzs4A-loy8DB2IO09aSg0w3fjZ9Xkqv-9DO_2HSlBaWzpwsICaIDYv9hZLHlp_bv1UHTs",
    verified: true,
    tags: ["Fleek", "ENS", "Web3"]
  }
];

export const filterCategories: FilterCategory[] = [
  { 
    name: "Infrastructure", 
    icon: "cloud",
    options: ["AWS", "Azure", "GCP", "DigitalOcean", "Vercel", "Netlify"]
  },
  { 
    name: "Framework", 
    icon: "code",
    options: ["React", "Vue", "Angular", "Next.js", "Node.js", "Python", "Go", "Rust"]
  }
];

export const quickFilters = [
  "Popular",
  "AWS",
  "Azure", 
  "GCP",
  "Docker",
  "Security Hardened"
];