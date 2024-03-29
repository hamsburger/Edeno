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
from pprint import pprint

import undetected_chromedriver as uc
from utilities.FirebaseSDK import FirebaseManager
from utilities.util_functions import camelCase, deriveNumericRequirements

class ChromeDriver:

    def __init__(self):
        options = self.configDriver()
        # self.windowIndex = 0
        self.driver = self.launchDriver(options)
        # print(f"DRIVER VERSION: {self.driver.capabilities['browserVersion']}")
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
        # userAgent = ua.random

        # Will use headless mode later
        options.add_argument("--headless")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        # options.add_argument('--proxy-server=ip:port')
        # options.add_argument(f'user-agent={userAgent}')
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

    def plantGeneralInfo(self, table):
        plant = table.find_element(By.CSS_SELECTOR, "tr")
        plant_link_tag = plant.find_element(By.CSS_SELECTOR, 'td:nth-child(2) > a')
        # print(plant.text)
        # print(plant_link_tag)
        a_link = plant_link_tag.get_attribute("href")
        a_text = plant_link_tag.text

        plant_scientific_name = ''
        if re.search(r"\([A-Za-z0-9\s]*", a_text):
            plant_scientific_name = re.search(r"\([A-Za-z0-9\s]*", a_text)[0].strip("() ")

        ## Append nickname to the common name
        plant_nickname = ''
        if re.search(r"\'[A-Za-z0-9\s]*", a_text):
            plant_nickname = re.search(r"\'[A-Za-z0-9\s]*", a_text)[0].strip("' ")


        plant_common_name = " ".join([re.match(r"^[A-Za-z\s]*", a_text)[0], plant_nickname])

        return (a_link, plant_common_name, plant_scientific_name)
        
    def getPlantInformation(self, link):
        self.driver.get(f"{link}")
        def get_plant_cell(postProcessor, selector_array=[]):
                try:
                    table_row = WebDriverWait(self.driver, timeout=10).until(
                        EC.presence_of_element_located(selector_array)
                    )
                    cell = table_row.find_element(By.CSS_SELECTOR, "td:nth-child(2)")
                    return postProcessor(cell)
                except (TimeoutException, Exception) as e:
                    return None
                        
        # Find Sunlight Information
        sunlight_cell_post_processor = lambda cell: '\n'.join([text.strip() for text in cell.text.split('\n')])
        sunlight_information = get_plant_cell(sunlight_cell_post_processor, [By.XPATH, "//tr[contains(., 'Sun Requirements')]"])

        # Find Water Information
        water_cell_post_processor = lambda cell: '\n'.join([text.strip() for text in cell.text.split('\n')])
        water_information = get_plant_cell(water_cell_post_processor, [By.XPATH, "//tr[contains(., 'Water Preferences')]"])

        
        if water_information is None:
            water_information = get_plant_cell(lambda cell: cell.text, [By.XPATH, "//tr[contains(., 'Suitable Locations')]"])
            print(water_information)
            if "xerisca" in water_information.lower():
                water_information = "dry"
            
        # Find pH cell
        def pH_postProcessor(cell):
            
            try:
                pH_information = cell.text  
                all_pH_descriptors = '\n'.join([descriptor.strip() for descriptor in re.findall(r'[A-Za-z\s]+', pH_information)
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
                pass

        pH_information = get_plant_cell(pH_postProcessor, [By.XPATH, "//tr[contains(., 'Soil pH Preferences')]"])
        all_pH_descriptors = None if pH_information is None else pH_information[0] 
        max_pH = None if pH_information is None else pH_information[1] 
        min_pH = None if pH_information is None else pH_information[2] 
        
        # Find Min Temperature Information
        min_temp_post_processor = lambda cell: re.match(r'Zone [0-9a-zA-Z]+', cell.text.strip())[0].strip()
        min_temp_information = get_plant_cell(min_temp_post_processor, [By.XPATH, "//tr[contains(., 'Minimum cold hardiness')]"])

        # Find Max Temperature Information
        max_temp_post_processor = lambda cell: re.match(r'Zone [0-9a-zA-Z]+', cell.text.strip())[0].strip()
        max_temp_information = get_plant_cell(max_temp_post_processor, [By.XPATH, "//tr[contains(., 'Maximum recommended zone')]"])
        

        temperature_information = None
        if min_temp_information:
            temperature_information = min_temp_information
        
        if max_temp_information:
            temperature_information = temperature_information + f"\n{max_temp_information}"

        return (water_information, sunlight_information, (all_pH_descriptors, max_pH, min_pH),
                temperature_information)
        
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
            table = WebDriverWait(self.driver, timeout=10).until(
                EC.presence_of_element_located([By.CSS_SELECTOR, ".pretty-table tbody"])
            )
        except TimeoutException as e:
            pass
            # pprint(html)
            # print(e)
            

        
        # Scroll function to simulate user movement
        # self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight/(Math.floor(Math.random() * 2)));")

        links_and_general_info = self.plantGeneralInfo(table)
    
        # Fetch plant information
        a_link, plant_common_name, plant_scientific_name = links_and_general_info
        water_information, sunlight_information, all_pH_information, \
        temperature_information = self.getPlantInformation(a_link)    

        # with open("rand.txt", mode="w+", encoding="utf-8") as f:
        #     f.write("=========================================================")
        #     f.write(f"Plant common name: {plant_common_name}\n")
        #     f.write(f"Water Information: {water_information}\n")
        #     f.write(f"Sunlight Information {sunlight_information}\n")
        #     f.write(f"Temperature Information {temperature_information}\n")
        #     f.write(f"All PH Information {all_pH_information}\n")

        all_pH_descriptors, max_pH, min_pH = all_pH_information

        temperature_information_for_numerical_prcessing = None
        if temperature_information:    
            temperature_information_for_numerical_prcessing = \
                temperature_information.lower().replace("zone", "")

        self.firebaseHandler.set_reference("recommendations/NGA")   
        light_requirements = deriveNumericRequirements("light", sunlight_information)   
        water_requirements = deriveNumericRequirements("humidity", water_information)
        temperature_requirements = deriveNumericRequirements("hardiness", 
                                            temperature_information_for_numerical_prcessing)
        plant_object = { 
            "scientificName" : camelCase(plant_scientific_name),    
            "link" : a_link,
            "lightIntensityData" : {
                "lightDescriptions" : sunlight_information,
            },
            "humidityData" : {
                "humidityDescriptions" : water_information,
            },
            "phData" : {
                "pHDescriptions" : all_pH_descriptors,
                "upperIdeal" : max_pH,
                "lowerIdeal" : min_pH 
            },
            "temperatureData" : {
                "temperatureDescriptions" : temperature_information,
            }
        }            

        if water_requirements:
            plant_object["humidityData"].update(water_requirements)
        
        if light_requirements:
            plant_object["lightIntensityData"].update(light_requirements)
        
        if temperature_requirements:
            plant_object["temperatureData"].update(temperature_requirements)

        # ## Saved to update user plant's garden.org name
        # plant_object["gardenOrgCommonName"] = plant_common_name
        
        return plant_object
        # return {}
            









        
        

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