package com.ioecg.tests;
import java.io.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.*;
public class Test2 {

	public static void main(String argc[])
	{
        ClassLoader classLoader = Test2.class.getClassLoader();
		String email=null,mdp=null,url=null;
		String fileName = "configtest/URL_Mail_MDP_NbProjets.txt";
		
		int nombreProjets = 0;
        try (InputStream is = classLoader.getResourceAsStream(fileName);
            BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
        	url = br.readLine(); 
            email = br.readLine();  
            mdp = br.readLine(); 
            nombreProjets = Integer.parseInt(br.readLine());

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
    		pilote.findElement(By.id("PlusButton")).click();
			pilote.findElement(By.id("CreateProjectButton")).click();
    		for(int i = 0; i<nombreProjets;i++)
    		{
        		pilote.findElement(By.id("projectName")).sendKeys("nom test"+i);
        		pilote.findElement(By.id("projectDescription")).sendKeys("projet crée dans le cadre d'un test automatique ( test 2 )");
        		pilote.findElement(By.id("submitButton")).click();
        		
    		}

        } catch (Exception e) {
            System.err.println("Erreur lors du chargement de la page : " + e.getMessage());
        } finally {
        	pilote.quit();
        	System.out.println("Fini !");
        }

	}
}
