# polymer_profile_page_static
A profile page created with polymer 2.

# Installation
```bash
npm install -g polymer-cli
npm install -g bower
```

# Use
```bash
# Clone the repo
git clone https://github.com/Temeteron/polymer_profile_page_static.git
# Cd to the directory
cd /polymer_profile_page_static
# Install dependencies
bower install
# Run the project
polymer serve --open
# Build
polymer build
```

# Deploy

1) If you want to deploy to a root path your profile page, like your_name.github.io, then just copy all the content of the build folder, which is generated after running:
    ```
    polymer  build
    ```
    and deploy.
2) If you want to deploy to a non-root path your profile page, like your_name.github.io/my_profile, then you should go to the file:
    ```
    /polymer_profile_page_static/index.html
    ```
    and at line 25 you must change the:
    ```
    <base href="/">
    ```
    to
    ```
    <base href="/my_profile/">
    ```
    Then, just build your project with the previous command and deploy with the same way.