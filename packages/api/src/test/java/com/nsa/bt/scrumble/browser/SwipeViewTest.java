//package com.nsa.cubric.browser;
//
//import ScrumbleAPI;;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.chrome.ChromeDriver;
//import org.openqa.selenium.firefox.FirefoxDriver;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.annotation.DirtiesContext;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.io.File;
//import java.util.concurrent.TimeUnit;
//
//import static org.junit.Assert.assertNotSame;
//
//@DirtiesContext
//@ContextConfiguration(classes = ScrumbleAPI.class)
//@RunWith(SpringRunner.class)
//@SpringBootTest()
//@AutoConfigureMockMvc
//public class SwipeViewTest
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
//            driver.get("/login");
//            driver.findElement(By.id("username")).sendKeys("loz");
//            driver.findElement(By.id("password")).sendKeys("pass");
//            driver.findElement(By.id("submit")).click();
//
//            driver.get("/swipe");
//
//            driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
//            // Assert images for a scan are shown
//            assert driver.findElement(By.id("image-holder")).isDisplayed();
//            // Assert yes and no buttons shown
//            assert driver.findElement(By.id("good-brain-icon")).isDisplayed();
//            assert driver.findElement(By.id("bad-brain-icon")).isDisplayed();
//
//            // Assert that a different scan will be shown after the initial is voted on
//            String firstImage = driver.findElement(By.id("current-image-v1")).getAttribute("src");
//            driver.findElement(By.id("good-brain-icon")).click();
//            String secondImage = driver.findElement(By.id("current-image-v1")).getAttribute("src");
//
//            assertNotSame(firstImage, secondImage);
//        }
//
//        @Test
//        @WithMockUser
//        public void testFirefox()
//            {
//
//                File firefoxDriver = new File(geckoDriverHome);
//                System.setProperty("webdriver.gecko.driver", ((File) firefoxDriver).getAbsolutePath());
//
//                WebDriver driver = new FirefoxDriver();
//
//                // Get past login
//                driver.get("/login");
//                driver.findElement(By.id("username")).sendKeys("loz");
//                driver.findElement(By.id("password")).sendKeys("pass");
//                driver.findElement(By.id("submit")).click();
//
//                // Go to swipe page
//                driver.get("/swipe");
//
//                driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
//                // Assert images for a scan are shown
//                assert driver.findElement(By.id("image-holder")).isDisplayed();
//                // Assert yes and no buttons shown
//                assert driver.findElement(By.id("good-brain-icon")).isDisplayed();
//                assert driver.findElement(By.id("bad-brain-icon")).isDisplayed();
//
//                // Assert that a different scan will be shown after the initial is voted on
//                String firstImage = driver.findElement(By.id("current-image-v1")).getAttribute("src");
//                driver.findElement(By.id("good-brain-icon")).click();
//                String secondImage = driver.findElement(By.id("current-image-v1")).getAttribute("src");
//
//                assertNotSame(firstImage, secondImage);
//
//            }
//    }