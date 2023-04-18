import os
import sys

"""
This python script is utilized in the `npm run deployment` script you can find
in `package.json`. This generates a .ts file that is used in the build phase
then promptly deleted once `npm run deployment` has reached its final stage
to ensure that the secrets entered are never leaked.
"""


def clearScreen(): return os.system('cls' if os.name == 'nt' else 'clear')


clearScreen()

print("Welcome to SAFE (System for Anonymous Feedback) configuration setup.\n\n"
      "This will guide you through setting up your connection to a\n"
      "specific database."

      "\n\n**NOTICE** -- You must already have PostgresSQL database setup\n"
      "and accessible with a username and password.\n")

if (os.path.exists("./src/safeMessageDB/messageDBConnect.ts")):
    confirm = input("\n**ALERT**: Database configuration already exists!\n"
                    "Would you like to reconfigure your settings? (Y/N): ")
    if (confirm.lower() == 'n'):
        print("\n\nKeeping current configuration...\n\n")
        sys.exit()

print("\n\nGenerating new configuration file...")
# Prompt the user for their database credentials
while True:
    username = input("Enter the username: ")

    password = input("\nEnter the password: ")

    endpoint = input("\nEnter the endpoint address: ")
    
    dbname = input("\nEnter the database name: ")

    print("Username: " + username)
    print("Password: " + password)
    print("Database address: " + endpoint)
    print("Database name: " + dbname)
    confirm = input("\nIs this correct? (Y/N): ")
    if confirm.lower() == 'y':
        break
    clearScreen()
    print("\nPlease enter the corrected information...")

# Create the .ts file
with open("./src/safeMessageDB/messageDBConnect.ts", "w") as file:
    file.write("import { Client } from 'pg';\n")
    file.write("\n")
    file.write("// Create database connection\n")
    file.write("const messageDBConnect = new Client({\n")
    file.write(f"    user: '{username}',\n")
    file.write(f"    password: '{password}',\n")
    file.write(f"    host: '{endpoint}',\n")
    file.write(f"    database: '{dbname}',\n")
    file.write("    port: 5432,\n")
    file.write(
        "    ssl: { rejectUnauthorized: false }, // only use this option for development purposes\n")
    file.write("});\n")
    file.write("\n")
    file.write("export { messageDBConnect };")

print("\n\n!!!File created!!!")
