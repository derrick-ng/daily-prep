daily prep is a web application that serves as a to-do list with additional features. The user will be sent a daily text at their chosen time with all of the information they choose.

Main Ideas:
main body: 
    to-do list, with important(!) checkbox, complete checkbox, edit/save, delete
additional features: 
    weather checkbox... sends temp range, weather conditions(rain, drizzle), wind, humidity
    eta to destination... set current location, destination, and checkbox for mode of transortation
    email checkbox w/ textbox asking for names


Sub Ideas:
dark mode                       //easiest implementation
in to-do list section, add history feature/filter to see previous, completed tasks         //low priority
create an account                       //much later, prob last feature... would need sql(?)
add a time allocation for weather to show data at given time range        //interesting... no idea how bc apis dont categorize like this. maybe webscraper?


Logistics:
important(!) to-dos will be sent to the top of the text
emails with a sender who matches name will be send to top of text


Possible Logistic Changes:
only send wind, humidity, etc info if above a certain %


Pre-Code Uncertainty:
Would important/normal to-do order be handle with a priority queue or a query


Order of Text:
1. Important to-dos
2. Name Matched Emails
3. Weather
4. Eta to Destination
5. Remainder of to-dos in ascending order (created)
6. Remainder of emails in ascending order (received?)


Need to Learn:
web scraping - email
smtp - sending text
django(?)