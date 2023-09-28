How to use npm ?
here are some commands

# structure of version (semantic versioning)

Eg: version 4.12.7 (major.minor.patch)
here,
4 is Major version (with possible breaking changes)
12 is minor changes indicating new features (or removal of features)
7 is patch release indicating bug fixes

# we can use it in package dependency such that

"version":"^4.12.7"(or "4.x.x") indicates that any version with same maojor(4) can be used ..so if we update package, it will only update minor and patch
"version":"~4.12.7"(or 4.12.x) indicates that any version with same major.minor (only patch is updated here)

# commands

# To initialize a repo with all default values

npm init --yes

# TO install package of any version ..@latest for latest version

npm i package-name@version
eg.npm i mangoose@latest

# To see version of all modules you have

npm list

# you can specify depth (nested directory level)

npm list depth= depth_level
eg.npm list depth=0

# TO view details of a particular package

npm view package-name

# To view details of package's property(deps,keywords,etc)

npm view package-name property-name
eg. npm view mongoose dependency

# To manage outdated packages

To see info of outdated packages
npm outated

TO update (updates only minor.patch)

# To update dependency semantic versioning limits (^ or ~)

# we need to use a golbally installed package npm-check-updates

# it only updates the dependency versions to latest in package.json (not actually update the package)

npm-check-updates
shorter command: ncu -u

# then run npm i to install required packages

# TO set environment variable, we use this in command

set var_name=value(no space around = )
export works too but not advised .. export PORT=5000
//Above wont work in powershell
$env:NODE_ENV="production"

