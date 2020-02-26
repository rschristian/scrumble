//package com.nsa.cubric.service;
//
//import ScrumbleAPI;
//import ExcelDumpService;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.DirtiesContext;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.io.File;
//import java.nio.file.Paths;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.Assert.assertTrue;
//
//@DirtiesContext
//@ContextConfiguration(classes = ScrumbleAPI.class)
//@RunWith(SpringRunner.class)
//@SpringBootTest()
//@AutoConfigureMockMvc
//public class ExcelDumpServiceTest
//    {
//
//        @Autowired
//        ExcelDumpService service;
//
//        @Test
//        public void shouldExportDataToExcelFileAndReturnFilePath()
//            {
//                File excelData = new File(Paths.get("src/main/resources/static/excel/swipe_data.xlsx").toString());
//                if(excelData.exists())
//                {
//                    excelData.delete();
//                }
//                assertThat(service.dumpData()).isEqualTo(Paths.get("/excel/swipe_data.xlsx").toString());
//                assertTrue(excelData.exists());
//            }
//    }
//
//
