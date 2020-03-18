//package com.nsa.bt.scrumble.config;
//
//import com.nsa.bt.scrumble.services.implementations.RedisService;
//import org.redisson.Redisson;
//import org.redisson.api.RedissonClient;
//import org.redisson.config.Config;
//import org.redisson.spring.cache.CacheConfig;
//import org.redisson.spring.cache.RedissonSpringCacheManager;
//import org.springframework.cache.CacheManager;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Configuration
//public class RedisConfig {
//
//    @Bean
//    public RedissonClient redissonClient() {
//        Config config = new Config();
//        config.useSingleServer()
//                .setAddress("redis://localhost:6379");
//        return Redisson.create(config);
//    }
//
//    @Bean
//    CacheManager cacheManager(RedissonClient redissonClient) {
//        Map<String, CacheConfig> config = new HashMap<>();
//        // create "scrumble" spring cache with ttl = 2 hours and maxIdleTime = 12 minutes
//        config.put("scrumble", new CacheConfig(120*60*1000, 12*60*1000));
//        return new RedissonSpringCacheManager(redissonClient, config);
//
//    }
//
//    @Bean
//    public RedisService redisService() {
//        return new RedisService();
//    }
//}
