package com.ioecg.tests;
import java.io.*;
import java.time.Duration;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
public class TestCreationProjet {

	public static void main(String argc[])
	{
        ClassLoader classLoader = TestCreationProjet.class.getClassLoader();
		String email=null,mdp=null,url=null;
		String fileName = "configtests/URL_Mail_MDP_NbProjets.txt";
		
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
	    pilote.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
		WebDriverWait wait = new WebDriverWait(pilote, Duration.ofSeconds(10));
		try {
            // Essayer d'accéder à localhost:5173
            pilote.get(url);
            WebElement ChampMail = pilote.findElement(By.xpath("/html/body/div/div/main/div/form/div[1]/input"));
    		ChampMail.sendKeys(email);
    		
    		WebElement ChampMDP = pilote.findElement(By.xpath("/html/body/div/div/main/div/form/div[2]/input"));
    		ChampMDP.sendKeys(mdp);
    		pilote.findElement(By.xpath("/html/body/div/div/main/div/form/button")).click();
    
    		for(int i = 0; i<nombreProjets;i++)
    		{
    			WebElement plusButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("PlusButton")));
    		    
    		    plusButton.click();
    		    
    		    WebElement createProjectButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("CreateProjectButton")));
    		    createProjectButton.click();
    			
    			wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("projectName")));
        		pilote.findElement(By.id("projectName")).sendKeys("nom test"+i);
        		pilote.findElement(By.id("projectDescription")).sendKeys("projet crée dans le cadre d'un test automatique ( test 2 )");
        		pilote.findElement(By.id("submitButton")).click();
        		Alert alert = wait.until(ExpectedConditions.alertIsPresent());
                alert.accept();  // Clique sur "OK"
                //gérer le cas du reload
                wait.until(webDriver -> ((JavascriptExecutor) webDriver)
                        .executeScript("return document.readyState").equals("complete"));
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("PlusButton")));
        		
    		}

        } catch (Exception e) {
            System.err.println("Erreur lors du chargement de la page : " + e.getMessage());
        } finally {
			try {
				Thread.sleep(5000); // Pause de 5 secondes
			} catch (InterruptedException e) {
				System.err.println("Erreur lors de la pause : " + e.getMessage());
			}
        	pilote.quit();
        	System.out.println("Fini !");
        }

	}
}
