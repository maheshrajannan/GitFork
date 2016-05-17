TESTDATE=`date +%b-%d-%y_%I_%M_%S_%p`
echo $TESTDATE 
zip ../DfsGithubApiProject_$TESTDATE DfsGithubApiProject -r . -x "*/node_modules/*"
