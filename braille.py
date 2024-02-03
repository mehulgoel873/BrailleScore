from selenium import webdriver
from selenium.webdriver.common.by import By
# from pynput.keyboard import Key,Controller
import time

# Specify the path to the webdriver executable (e.g., chromedriver.exe)
# webdriver_path = 'chromedriver-mac-arm64'

def musicthings(filename):
    # Create a new instance of the Chrome browser
    options = webdriver.ChromeOptions()

    prefs = {"download.default_directory" : "/Users/mehulgoel/Documents/BrailleScore/BRL"}
    options.add_experimental_option("prefs",prefs)

    driver = webdriver.Chrome(options=options)  

    # URL of the website with the file upload form
    url = 'https://www.braillemuse.net/BrailleMUSEpre/en2/Input-e-b3-lyricP-UTF8.jsp'
    driver.get(url)

    # time.sleep(1)
    print("Inputtng File")
    # Locate the file input element using its HTML attribute (e.g., 'id' or 'name')
    file_input_id = 'file'
    file_input = driver.find_element("xpath", "//input[@type='file']")

    # Specify the path to the file you want to upload
    file_path = filename

    #'/Users/utsav/Downloads/xtwinkle-piano-easy.gif.pagespeed.ic.xyk2Wg3Efw.musicxml'

    # file_input.click()
    # time.sleep(3)

    print("Sending Key")
    # Use send_keys to set the file path in the file input field
    file_input.send_keys(file_path)
    print("Sent Key")
    # Some websites may require a short delay after setting the file path
    # time.sleep(2)

    # Submit the form or perform other actions as needed
    # (e.g., click the 'Submit' button)
    submit_button_id = 'submit'
    submit_button = driver.find_element("xpath", "//input[@type='submit']").click()

    # time.sleep(5)

    download_button = driver.find_element("xpath", "//input[@type='submit' and @value='Download']")
    download_button.click()

    time.sleep(30)

    # Close the browser window
    driver.quit()

musicthings('/Users/utsav/Downloads/twinkle.musicxml')