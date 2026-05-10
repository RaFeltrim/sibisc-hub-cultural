#!/bin/bash
# Security Remediation Script — SIBiSC Repository
# Execute ONLY after taking precautions (backup, notify team)

set -e

echo "🔒 SIBiSC Security Remediation"
echo "================================"
echo ""
echo "⚠️  WARNING: This script will rewrite Git history"
echo "⚠️  All team members MUST re-clone after this"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
fi

echo ""
echo "Step 1: Install BFG Repo-Cleaner"
echo "=================================="
# Check if bfg is installed
if ! command -v bfg &> /dev/null; then
    echo "Installing BFG Repo-Cleaner..."
    # For macOS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install bfg
    # For Ubuntu/Debian
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get install bfg
    # For Windows (using PowerShell)
    else
        echo "Please download BFG from: https://rtyley.github.io/bfg-repo-cleaner/"
        exit 1
    fi
fi

echo ""
echo "Step 2: Create credentials.txt for BFG"
echo "========================================"
cat > /tmp/credentials.txt << 'EOF'
# Supabase Keys (REVOKE IMMEDIATELY)
sb_publishable_UklsEfW9sJJP5ScGJItGVw_OhJRQ2Kf
vuhfazknlyqnphriilkw.supabase.co
EOF

echo "✓ Created /tmp/credentials.txt"

echo ""
echo "Step 3: Run BFG to remove credentials"
echo "======================================"
bfg --replace-text /tmp/credentials.txt --no-blob-protection .

echo ""
echo "Step 4: Clean Git database"
echo "=========================="
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo ""
echo "Step 5: Verify removal"
echo "===================="
if git log -S "sb_publishable" -p | grep -q "sb_publishable"; then
    echo "❌ ERROR: Credentials still in history!"
    exit 1
else
    echo "✓ Credentials removed from history"
fi

echo ""
echo "Step 6: Force push (DANGEROUS)"
echo "=============================="
echo "This will rewrite history on the remote."
read -p "Force push to origin? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Skipped force push. Run manually when ready:"
    echo "  git push origin $(git rev-parse --abbrev-ref HEAD) --force"
    exit 0
fi

git push origin $(git rev-parse --abbrev-ref HEAD) --force

echo ""
echo "✅ Remediation complete!"
echo ""
echo "📋 NEXT STEPS (MANDATORY):"
echo "1. [ ] Revoke credentials in Supabase console"
echo "2. [ ] Generate new API keys"
echo "3. [ ] Update GitHub Secrets with new keys"
echo "4. [ ] Notify team to re-clone (git clone not pull)"
echo "5. [ ] Verify CI/CD working with new keys"
echo "6. [ ] Delete /tmp/credentials.txt"
echo ""
echo "rm /tmp/credentials.txt"
