package com.ioecg.tests;

import java.io.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.*;
public class Test1
{

	public static void main(String argc[])
	{
        ClassLoader classLoader = Test1.class.getClassLoader();
		String email=null,mdp=null,url=null;
		String fileName = "configtests/URL_Mail_MDP.txt";

        try (InputStream is = classLoader.getResourceAsStream(fileName);
            BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
        	url = br.readLine();
        	email = br.readLine(); 
            mdp = br.readLine(); 

        } catch (IOException e) {
            System.err.println("Erreur de lecture du fichier : " + e.getMessage());
        }
		WebDriverManager.firefoxdriver().setup();
		WebDriver pilote = new FirefoxDriver();
		try {
            // Essayer d'accéder à localhost:5173
            pilote.get(url);
            WebElement ChampMail = pilote.findElement(By.xpath("/html/body/div/div/main/div/form/div[1]/input"));
    		ChampMail.sendKeys(email);
    		
    		WebElement ChampMDP = pilote.findElement(By.xpath("/html/body/div/div/main/div/form/div[2]/input"));
    		ChampMDP.sendKeys(mdp);
    		pilote.findElement(By.xpath("/html/body/div/div/main/div/form/button")).click();
    		
        } catch (Exception e) {
            System.err.println("Erreur lors du chargement de la page : " + e.getMessage());
        } finally {
        	System.out.println("Fini !");
            pilote.quit();
        }

	}
}
