daily prep is a web application that serves as a to-do list with additional features. The user will be sent a daily text at their chosen time with all of the information they choose.

How code will flow:
user checks, to-dos, etc
SAVE BUTTON
everything with inputs & to-dos will be saved to database
python read database        (hardcode to insta read database, later make it work at given time)
gathers all info        //maybe save to database again
reformat into text
send text


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
only send wind, humidity, etc info if above a certain % threshold
have a save button after each addition feature
    ex. weather checkbox, email, eta all have saves 


Pre-Code Uncertainty:
Would important/normal to-do order be handle with a priority queue or a query
maybe put weather, email, eta to destination in a form to submit to save selection
    initial idea: make each category a div and make checkbox results persistent
Where does save button go?
    inside time, only store time, every other feature gets saved from local storage
    outside time, store all additional features, still local storage


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



small code notes so dont forget:
checkbox all have individual ids, might need class
make sure all correct things have validation, email, name priority senders, time, etc
mode of transportation only works if theres start and end