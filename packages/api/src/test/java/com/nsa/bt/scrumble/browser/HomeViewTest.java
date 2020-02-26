//package com.nsa.cubric.browser;
//
//import ScrumbleAPI;
////import geb.Browser;
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
//// Tests that the correct image loads on the home page in Chrome and Firefox
//
//@DirtiesContext
//@ContextConfiguration(classes = ScrumbleAPI.class)
//@RunWith(SpringRunner.class)
//@SpringBootTest()
//@AutoConfigureMockMvc
//public class HomeViewTest
//    {
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
//            // Get past login
//            driver.get("/login");
//            driver.findElement(By.id("username")).sendKeys("loz");
//            driver.findElement(By.id("password")).sendKeys("pass");
//            driver.findElement(By.id("submit")).click();
//
//            driver.get("/home");
//
//            driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
//            assert driver.findElement(By.id("home-image")).isDisplayed();
////            assert driver.findElement(By.id("home-image")).getAttribute("src").equals( "/images/brain_scans/brain_3.jpg.png");
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
//                // Get past login
//                driver.get("/login");
//                driver.findElement(By.id("username")).sendKeys("loz");
//                driver.findElement(By.id("password")).sendKeys("pass");
//                driver.findElement(By.id("submit")).click();
//
//                driver.get("/home");
//
//                driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
//                assert driver.findElement(By.id("home-image")).isDisplayed();
////                assert driver.findElement(By.id("home-image")).getAttribute("src").equals( "/images/brain_scans/brain_3.jpg.png");
//
//            }
//    }