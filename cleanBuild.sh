echo 'Cleaning DfsGitHubUI'
cd DfsGitHubUI;pwd
rm -fr node_modules/*
echo 'Now installing'
npm install

echo 'Cleaning DfsGitHubApi'
cd ../DfsGitHubApi;pwd
rm -fr node_modules/*
echo 'Now installing'
npm install

cd ../;pwd