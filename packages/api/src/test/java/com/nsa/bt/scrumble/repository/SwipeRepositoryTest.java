//package com.nsa.cubric.repository;
//
//import ScrumbleAPI;
//import Swipe;
//import SwipeRepository;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.data.jdbc.AutoConfigureDataJdbc;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.DirtiesContext;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.util.Date;
//
//import static org.assertj.core.api.Assertions.assertThat;
//@DirtiesContext
//@ContextConfiguration(classes = ScrumbleAPI.class)
//@RunWith(SpringRunner.class)
//@SpringBootTest
//@ActiveProfiles("dev")
//@AutoConfigureDataJdbc
//public class SwipeRepositoryTest
//    {
//        @Autowired
//        SwipeRepository repository;
//
//        private Swipe swipe;
//
//        @Before
//        public void setUp()
//            {
//                swipe = new Swipe("10014A_split_MD_C_trafo_tracts_dRL_FOD_interp_FORNIX.jpg", "loz", 1, new Date());
//            }
//
//        @Test
//        public void shouldPersistSwipe()
//            {
//                repository.insertSwipe(swipe);
//                assertThat(repository.getSwipesByUserName(swipe.getUsername()).get(0).getScanId()).isEqualTo(swipe.getScanId());
//                assertThat(repository.getSwipesByUserName(swipe.getUsername()).get(0).getUsername()).isEqualTo(swipe.getUsername());
//                assertThat(repository.getSwipesByUserName(swipe.getUsername()).get(0).getIsGoodAnswer()).isEqualTo(swipe.getIsGoodAnswer());
//            }
//    }
