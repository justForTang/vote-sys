package org.sicau.votesys;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.UUID;

@RunWith(SpringRunner.class)
@SpringBootTest
public class VoteSysApplicationTests {

    @Test
    public void contextLoads() {
        String id = String.valueOf(UUID.randomUUID()).replace("-","");
        System.out.println(id);
    }

}
