# Ahmed Iftikhar — Portfolio Website

A professional, dark-themed portfolio website built with pure HTML, CSS, and JavaScript.

## 🚀 Features

- Dark theme with glassmorphism & gradient effects
- Smooth scroll animations and reveal effects
- Typewriter hero text
- Animated project carousel with auto-advance
- Animated count-up statistics
- Custom cursor
- Fully responsive (mobile, tablet, desktop)
- Working contact form (opens email client)
- Clickable links to GitHub, LinkedIn, projects

---

## 📁 Project Structure

```
ahmed-portfolio/
├── index.html        # Main HTML structure
├── style.css         # All styles, animations, responsive
├── script.js         # Interactions, carousel, cursor
├── README.md         # This file
└── requirements.txt  # Tech stack info
```

---

## 🖥️ Running Locally

No build tools needed. Just open the file:

**Option 1 — Direct open:**
```
Double-click index.html in your file manager
```

**Option 2 — VS Code Live Server (recommended):**
1. Install the "Live Server" extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Your browser opens at `http://127.0.0.1:5500`

---

## 📤 Deploying to GitHub Pages (Live URL)

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click **New** (the green button or **+** icon → New repository)
3. Name it: `ahmed-portfolio` (or `AhmedIftikhar02.github.io` for root domain)
4. Set visibility to **Public**
5. Leave "Initialize repository" **unchecked**
6. Click **Create repository**

---

### Step 2: Push Your Code to GitHub

Open a terminal (Command Prompt / Git Bash / Terminal) inside the project folder:

```bash
# Initialize git
git init

# Stage all files
git add .

# First commit
git commit -m "Initial commit: Ahmed Iftikhar Portfolio"

# Connect to your GitHub repo (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/AhmedIftikhar02/ahmed-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top tab)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1–2 minutes

Your live URL will appear at the top:
```
https://AhmedIftikhar02.github.io/ahmed-portfolio/
```

---

### Step 4: Update Your Site

Whenever you make changes:

```bash
git add .
git commit -m "Update: describe what you changed"
git push
```

GitHub Pages will auto-update within a minute.

---

## 🌐 Custom Domain (Optional)

If you own a domain (e.g. `ahmediftikhar.dev`):

1. In your repo, go to **Settings → Pages**
2. Under "Custom domain", enter your domain
3. Click **Save**
4. In your domain registrar (GoDaddy, Namecheap, etc.), add these DNS records:

```
Type: A     Name: @    Value: 185.199.108.153
Type: A     Name: @    Value: 185.199.109.153
Type: A     Name: @    Value: 185.199.110.153
Type: A     Name: @    Value: 185.199.111.153
Type: CNAME Name: www  Value: AhmedIftikhar02.github.io
```

---

## 🔧 Customization

| What to change              | Where to find it                      |
|-----------------------------|---------------------------------------|
| Your name / bio text        | `index.html` — hero and about sections |
| Profile links               | `index.html` — contact section & nav  |
| Projects                    | `index.html` — `.project-card` blocks |
| Colors / theme              | `style.css` — `:root` CSS variables   |
| Typewriter roles            | `script.js` — `const roles = [...]`   |

---

## 📦 Dependencies

None! This is a zero-dependency project. Everything is vanilla HTML, CSS, and JavaScript.

The only external resource loaded is Google Fonts (requires internet):
```
Syne — display / headings font
DM Sans — body text font
```

---

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

---

## 📄 License

This portfolio is personal to Ahmed Iftikhar. Do not redistribute or reuse without permission.
