# System for Anonymous Feedback (SAFE)

## Project Description
SAFE is a secure feedback platform designed to empower students to openly express their questions, comments and concerns anonymously for the computer science department chair at Portland State University.

It offers an invaluable method for students to provide honest feedback, shedding light on areas where improvement is needed and offering suggestions to enhance the support provided for their success.

Significantly, SAFE employees a user-centric approach by relieving students from the obligation to log in or create an account, thereby guaranteeing the utmost protection of their privacy as no personal identifying information is stored.

## Feature
   - Allow students to submit anonymous feedback to the chair of the Portland State University Computer Science department. 
   - Provide user a unique code if they would like to receive reply of their feedback
   - Provide an option to user if they would like to receive the unique code to input email address
   - Check receiver's reply with provided unique code.
   - **For more implementation details, please refer to the [SAFE Technical Document.](https://docs.google.com/document/d/1MdtnJYj4y3OirrlEhxFQHG48TJet-ErY3psOXECbdkA/edit?usp=sharing)

## Configuration
**This `development` branch is for working on features in progress.**
**Create new branches from this repository when working on future releases.**

This branch (and its children) can be developed on any machine. Both front end
and back end can work on the PSU network to develop new features. Examine the
[technical document](https://docs.google.com/document/d/1MdtnJYj4y3OirrlEhxFQHG48TJet-ErY3psOXECbdkA/edit?usp=sharing) further to understand how this works.

To connect to the database and test the backend code, you will need to establish a [VPN connection to PSU network](https://cat.pdx.edu/services/network/vpn-services/). 

## Compile Instruction
1. Log in your `ssh username@rita.cecs.pdx.edu` in PSU Linux system, go to public_html folder
      - Why do we need to use use `rita` not `ada` or `ruby`? - We use the `rita` IP address to fetch requests for student developers to test the website on their PSU personal websites. Alternatively, you can use `ada`, but you'll need the corresponding IP address. Unfortunately, `ruby` doesn't have an available IP address for student use.
      - You can get current hosts ip with `hostname -i`
      - Why do we need to use `public_html` not `dev_html`? - We need to use HTTP instead of HTTPS because the dev_html URL will always auto-correct to HTTPS.


2. Clone the repository and switch to the `development` branch 
      - `git clone https://github.com/PSU-MCECS-SAFE/SAFE.git` 
      - `git checkout development`


3. Run `npm run psu_deploy`
      - **Option 1** in the menu will run automatically run if the script detects that it is missing `safeConfig.json`
        - This option will install all necessary packages for SAFE, setup, and generate files to make database connections. More details please refer to the
        [technical documentation.](https://docs.google.com/document/d/1MdtnJYj4y3OirrlEhxFQHG48TJet-ErY3psOXECbdkA/edit?usp=sharing)
      - Fill out the database login information and receiver email address.
      - **Option 7** will only successfully and fully execute if it is on the VM `feedback.cs.pdx.edu`, otherwise an error pops up alerting the user of this fact.
      - Read the SAFE [technical documentation](https://docs.google.com/document/d/1MdtnJYj4y3OirrlEhxFQHG48TJet-ErY3psOXECbdkA/edit?usp=sharing) for more information regarding the script.

4. Run `node JSoutFile/safeMessageDB/server.js`
      - This command line will start the REST server, allowing the server to listen to the assigned IP and perform POST and GET requests to and from the database.


5. Open your PSU personal website of build folder and **you're in SAFE now!**
      - https://web.cecs.pdx.edu/~username/SAFE/build
      - [CAT's explainer on how to setup your PSU web page](https://cat.pdx.edu/services/web/account-websites/) and the permissions required to make the site visible.
        - **Note: The python script will set these permissions correctly build is ran.**


## Common errors when compiling or deploying code working with public_html on `rita`
- make sure you're at HTTP instead of HTTPS (http:// vs https://)
- make sure you're connected to VPN
- make sure code is in public_html folder

## Documentation
- [SAFE Technical Document](https://docs.google.com/document/d/1MdtnJYj4y3OirrlEhxFQHG48TJet-ErY3psOXECbdkA/edit?usp=sharing)
- [SAFE Project Document](https://docs.google.com/document/d/10eupnhzwyy5QGYRyrANkVYcIVGvMmakqFB1AjU6x6So/edit?usp=sharing)

## License Information
The SAFE Project is currently licensed under the MIT license.