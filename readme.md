# System for Anonymous Feedback (SAFE)

## Project Description
SAFE is a secure feedback platform designed to empower students to openly express their questions and comments anonymously for the computer science department chair in Portland State University.

It offers an invaluable method for students to provide honest feedback, shedding light on areas where improvement is needed and offering suggestions to enhance the support provided for their success.

Significantly, SAFE exudes a user-centric approach by relieving students from the obligation to log in or create an account, thereby guaranteeing the utmost protection of their privacy as no identifying information is stored.

## Configuration
   - This branch setup is only for developing purposes, there are slightly difference setups between `main`(deploy to SAFE domain) and this branch.
   - To connect to the database and test the backend code, you will need to establish a [VPN connection to PSU network](https://cat.pdx.edu/services/network/vpn-services/). 

## Compile Instruction
1. Log in your `ssh username@rita.cecs.pdx.edu` in PSU Linux system, go to public_html folder
      - Why use `rita` not `ada` or `ruby`? - We use the `rita` IP address to fetch requests for student developers to test the website on their PSU personal websites. Alternatively, you can use `ada`, but you'll need the corresponding IP address. Unfortunately, `ruby` doesn't have an available IP address for student use.
      - Why we use public_html not dev_html? - We need to use HTTP instead of HTTPS because the dev_html URL will always auto-correct to HTTPS.
2. Clone the repository and `git checkout MVP` to MVP branch 
3. Run `npm run psu_deploy`
      - Choose option 1 in the menu, and fill out the database login information. 
      - Choose Option 0 when the script is done.
      - This command line will install all necessary packages for SAFE, setup, and generate files to make database connections. More details please refer to [issue#27](https://github.com/PSU-MCECS-SAFE/SAFE/issues/27#issue-1697069201)
4. Run `node JSoutFile/safeMessageDB/server.js`
      - This command line will start the REST server, allowing the server to listen to the assigned IP.
5. Open your PSU personal website of build folder and **you're in SAFE now!**
      - https://web.cecs.pdx.edu/~username/SAFE/build
      - [reference](https://cat.pdx.edu/services/web/account-websites/) of your PSU web pages

   Common errors when compiling or deploying code
      - make sure you're at HTTP instead of HTTPS 
      - make sure you're connected to VPN
      - make sure code is in public_html folder

## Documentation (Will update when its finalize)
   - SAFE Project Document
   - SAFE Technical Document

## License Information
The SAFE Project is currently licensed under the MIT license.
