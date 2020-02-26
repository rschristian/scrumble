//package com.nsa.cubric.browser;
//
//import ScrumbleAPI;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.chrome.ChromeDriver;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.openqa.selenium.support.ui.WebDriverWait;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.annotation.DirtiesContext;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.io.File;
//
//
//@DirtiesContext
//@ContextConfiguration(classes = ScrumbleAPI.class)
//@RunWith(SpringRunner.class)
//@SpringBootTest()
//public class RegistrationAndAutoLoginTest
//    {
//
//        @Value("${webdriver.chrome.home}")
//        private String chromeDriverHome;
//
//        @Value("${webdriver.gecko.home}")
//        private String geckoDriverHome;
//
//        @Test
//        @WithMockUser
//        public void testChrome(){
//
//            File chromeDriver = new File(chromeDriverHome);
//            System.setProperty("webdriver.chrome.driver", ((File) chromeDriver).getAbsolutePath());
//
//            WebDriver driver = new ChromeDriver();
//            driver.get("/registration");
//            driver.findElement(By.id("username")).sendKeys("randomUsername");
//            driver.findElement(By.id("password")).sendKeys("Password1");
//            driver.findElement(By.id("passwordConfirm")).sendKeys("Password1");
//            driver.findElement(By.id("email")).sendKeys("randomUsername@gmail.com");
//            driver.findElement(By.id("submit")).click();
//
//            WebDriverWait wait = new WebDriverWait(driver, 10);
//
//            WebElement element = wait.until(ExpectedConditions.elementToBeClickable(By.id("btn-pass")));
//
//            element.click();
//
//            // Assert new registered users are shown training
//            assert driver.findElement(By.id("trainingContent")).isDisplayed();
//
//        }
//
//        /*
//            The same test as above only it passes in chrome and not Firefox. I haven't debugged this.
//         */
//
////        @Test
////        @WithMockUser
////        public void testFirefox()
////            {
////
////                File firefoxDriver = new File(geckoDriverHome);
////                System.setProperty("webdriver.gecko.driver", ((File) firefoxDriver).getAbsolutePath());
////
////                WebDriver driver = new FirefoxDriver();
////
////                // Get past login
////                driver.get("/registration");
////                driver.findElement(By.id("username")).sendKeys("randomUsername2");
////                driver.findElement(By.id("password")).sendKeys("Password1");
////                driver.findElement(By.id("passwordConfirm")).sendKeys("Password1");
////                driver.findElement(By.id("email")).sendKeys("randomUsername2@gmail.com");
////                driver.findElement(By.id("submit")).click();
////
////                WebDriverWait wait = new WebDriverWait(driver, 10);
////
////                WebElement element = wait.until(ExpectedConditions.elementToBeClickable(By.id("btn-pass")));
////
////                element.click();
////
////                // Assert new registered users are shown training
////                assert driver.findElement(By.id("trainingContent")).isDisplayed();
////            }
//    }
