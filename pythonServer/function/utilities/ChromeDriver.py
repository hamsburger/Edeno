import time
from collections import defaultdict
# from bs4 import BeautifulSoup
from collections.abc import Mapping
import re
from fake_useragent import UserAgent
from selenium import webdriver
from selenium.common import exceptions as SExceptions, TimeoutException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
import selenium.webdriver.support.expected_conditions as EC 
from webdriver_manager.chrome import ChromeDriverManager

import undetected_chromedriver as uc
from .FirebaseSDK import FirebaseManager
from utilities import camelCase

class ChromeDriver:

    def __init__(self):
        options = self.configDriver()
        # self.windowIndex = 0
        self.driver = self.launchDriver(options)
        self.firebaseHandler = FirebaseManager()
        # self.oldURL = self.driver.execute_script("return window.location.href")
        # self.oldTabs = []
        # atexit.register(self.goodbye)
        

    def switch_to_new_tab(self, index) -> None: 
        ''' 
            Switch driver to currently selected window_name.
            1. If newIndex is selected, change self.windowIndex to that index.
            2. If NoSuchWindowException (in knowItAll.py), switch to len(driver.window_handles) - 1 index. 
            2.a. If window detected is different, switch to newIndex. If we close window we're currently on, we always switch to the last window.
            3. Just in case if the window we close is the last window, switch to the new window.
            4. If window we close is on the left of current window, minus newIndex by 1? 
        '''

        if self.windowIndex < len(self.driver.window_handles) and self.driver.window_handles[index] == self.oldURL:
            return

        self.driver.switch_to.window(self.driver.window_handles[index])
        self.windowIndex = index
        self.oldURL = self.driver.window_handles[self.windowIndex]

    def goodbye(self):
        ActionChains(self.driver).send_keys(Keys.ALT, 'F').send_keys('X')

    def configDriver(self):
        options = webdriver.ChromeOptions()
        ua = UserAgent()
        userAgent = ua.random

        # Will use headless mode later
        # options.add_argument("--headless")
        options.add_argument(f'user-agent={userAgent}')
        # options.add_experimental_option("detach", True)
        #                          
        # options.add_argument("--user-data-dir=C:/Users/harri/AppData/Local/Google/Chrome/User Data")
        # options.add_argument("--profile-directory=Profile 1")
        # options.add_extension("C:/Users/harri/Documents/Programming/Pure_Skills/Python/SeleniumDriver/pdf_viewer.crx")
        # options.set_capability('unhandledPromptBehavior', 'accept')
        # options.add_argument("--disable-notifications")
        return options
    
    def launchDriver(self, options):
        # subprocess.call("bash dGCache", shell=True) ## Remove Cache      
        driver = uc.Chrome(version_main=110, options=options)
        # driver.implicitly_wait(4)
        print("Driver at launchDriver:", driver)
        driver.maximize_window()
        return driver
    
    def maxWindow(self):
        self.driver.maximize_window()

    def relevantHashTag(self, searchInterest):
        """
            Title: relevantHashTag
            Description: Find All Relevant Hashtags related to a searchInterest
            returns: All Hashtags 
            params: 
                @self.driver -- The WebDriver
                @searchInterest -- User's search query on best-hashtags
        """
        ## Context
        self.driver.get("https://best-hashtags.com/")
        searchBar = self.driver.find_element_by_id("cauta")
        searchButton = self.driver.find_element_by_css_selector(".btn-u")
        
        searchBar.send_keys(searchInterest)
        searchButton.click() 
        time.sleep(5)
        firstTagBox = self.driver.find_element_by_css_selector(".tag-box:nth-child(5) *:first-child")
        secondTagBox = self.driver.find_element_by_css_selector(".tag-box:nth-child(10) *:first-child")
        print(firstTagBox.text + secondTagBox.text)
        return firstTagBox.text + secondTagBox.text
    
    def scrapeNGA(self, plant_to_search, BASE_URL="garden.org"):
        
        ## Bypass ReCAPTCHA         
        self.driver.get(f'https://{BASE_URL}/plants/search/text/?q={plant_to_search}')
        
        ## Use our own CAPTCHA Decryption Algorithm if undetected_selenium stops working one day
        # try:
        #     verify_humanity = WebDriverWait(self.driver, timeout=10).until(
        #         EC.presence_of_element_located([By.CSS_SELECTOR, "#challenge-stage > div > input"])
        #     )

        #     verify_humanity.click()  
        # except TimeoutException:
        #     pass 
        
        # try:
        #     captcha_iframe = WebDriverWait(self.driver, timeout=10).until(
        #         EC.presence_of_element_located([By.CSS_SELECTOR, "#challenge-stage iframe"])
        #     )

        #     self.driver.switch_to.frame(captcha_iframe)
        #     self.driver.find_element(By.CSS_SELECTOR, "span.mark").click()
        #     time.sleep(2)
        #     self.driver.switch_to.default_content()
        # except TimeoutException:
        #     pass 
        
        
        ## Wait for Desired Table to Load
        table = None
        try:
            table = WebDriverWait(self.driver, timeout=3).until(
                EC.presence_of_element_located([By.CSS_SELECTOR, ".pretty-table tbody"])
            )
        except TimeoutException as e:
            print(e)

        plants = table.find_elements(By.CSS_SELECTOR, "tr")

        ## Save all links for Top 5 Results so that we don't have to query again
        links_and_general_info = []

        # Get Links for Top 5 Results
        for i, plant in enumerate(plants):
            if i == 5:
                break

            plant_link_tag = plant.find_element(By.CSS_SELECTOR, 'td:nth-child(2) > a')
            # print(plant.text)
            # print(plant_link_tag)
            a_link = plant_link_tag.get_attribute("href")
            a_text = plant_link_tag.text
            print(a_text)

            plant_scientific_name = ''
            if re.search(r"\([A-Za-z0-9\s]*", a_text):
                plant_scientific_name = re.search(r"\([A-Za-z0-9\s]*", a_text)[0].strip("() ")

            ## Append nickname to the common name
            plant_nickname = ''
            if re.search(r"\'[A-Za-z0-9\s]*", a_text):
                plant_nickname = re.search(r"\'[A-Za-z0-9\s]*", a_text)[0].strip("' ")


            plant_common_name = " ".join([re.match(r"^[A-Za-z\s]*", a_text)[0], plant_nickname])


            # Scroll function to simulate user movement
            # self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight/(Math.floor(Math.random() * 2)));")

            links_and_general_info.append((a_link, plant_common_name, plant_scientific_name))

        def get_plant_cell(postProcessor, selector_array=[]):
                try:
                    table_row = WebDriverWait(self.driver, timeout=2).until(
                        EC.presence_of_element_located(selector_array)
                    )
                    cell = table_row.find_element(By.CSS_SELECTOR, "td:nth-child(2)")
                    return postProcessor(cell)
                except (TimeoutException, Exception) as e:
                    print(e)
                    return None

        # For every link, we fetch plant information
        for a_link, plant_common_name, plant_scientific_name in links_and_general_info:
            self.driver.get(f"{a_link}")

            # Find Sunlight Information
            sunlight_cell_post_processor = lambda cell: ', '.join([text.strip() for text in cell.text.split('\n')])
            sunlight_information = get_plant_cell(sunlight_cell_post_processor, [By.XPATH, "//tr[contains(., 'Sun Requirements')]"])

            # Find Water Information
            water_cell_post_processor = lambda cell: cell.text.strip()
            water_information = get_plant_cell(water_cell_post_processor, [By.XPATH, "//tr[contains(., 'Water Preferences')]"])

            if water_information is None:
                water_information = get_plant_cell(water_cell_post_processor, [By.XPATH, "//tr[contains(., 'Suitable Locations')]"])
            
            # Find pH cell
            def pH_postProcessor(cell):
                
                try:
                    pH_information = cell.text  
                    all_pH_descriptors = ', '.join([descriptor.strip() for descriptor in re.findall(r'[A-Za-z\s]+', pH_information)
                                                    if descriptor.strip() != ''])
                    all_pH_ranges = re.findall(r'\(.+\)', pH_information) 
                    pH_range_array = []
                    
                    for pH_range in all_pH_ranges:
                        pH_range_min, pH_range_max = pH_range.strip("()").split('–')
                        pH_range_array.extend([float(pH_range_min.strip()), float(pH_range_max.strip())])

                    max_pH = max(pH_range_array)
                    min_pH = min(pH_range_array)
                    return (all_pH_descriptors, max_pH, min_pH)
                except Exception as e:
                    print(e)

            pH_information = get_plant_cell(pH_postProcessor, [By.XPATH, "//tr[contains(., 'Soil pH Preferences')]"])
            all_pH_descriptors = None if pH_information is None else pH_information[0] 
            max_pH = None if pH_information is None else pH_information[1] 
            min_pH = None if pH_information is None else pH_information[2] 
            
            # Find Temperature Information
            min_temp_post_processor = lambda cell: re.match(r'Zone [0-9a-zA-Z]+', cell.text.strip())[0].strip()
            min_temp_information = get_plant_cell(min_temp_post_processor, [By.XPATH, "//tr[contains(., 'Minimum cold hardiness')]"])

            # Find Max Temperature Information
            max_temp_post_processor = lambda cell: re.match(r'Zone [0-9a-zA-Z]+', cell.text.strip())[0].strip()
            max_temp_information = get_plant_cell(max_temp_post_processor, [By.XPATH, "//tr[contains(., 'Maximum recommended zone')]"])

            # Insert Plant Recommendation data to FireBase
            self.firebaseHandler.set_reference("recommendations/NGA")
            self.firebaseHandler.insert_data_on_key(camelCase(plant_common_name), {
                    "scientificName" : plant_scientific_name,    
                    "link" : a_link,
                    "sunRequirements" : sunlight_information,
                    "waterPreference" : water_information,
                    "pHRequirements" : {
                        "maxPH" : max_pH,
                        "minPH" : min_pH 
                    },
                    "pHDescriptions" : all_pH_descriptors,
                    "temperatureZones" : {
                        "minZone" : min_temp_information,
                        "maxZone" : max_temp_information
                    },
                    
            })
            
            
            # Bar for cleaning PH string: –


            









        
        

    # def searchGoogle(self, tags):
    #     self.driver.get("https://google.com/")
    #     time.sleep(5)
        
    #     for tag in tags:
    #         searchBar = self.driver.find_element_by_css_selector("input[name='q']")
    #         searchBar.clear()
    #         searchBar.send_keys(tag, Keys.ENTER)
    #         delay = int(random.randrange(60, 120))

    #         ## Don't sleep if only one element is searched
    #         if len(tags) == 1:
    #             return 0

    #         print("Sleeping for", delay)
    #         time.sleep(delay)