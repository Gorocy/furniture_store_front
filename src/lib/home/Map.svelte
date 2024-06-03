<script>
</script>

<div class="center px-5 pb-5 flex map">
    <div class="contact-form">
        <h1>Skontaktuj się z nami</h1>
        <p>
            Zawsze możesz się z nami skontaktować. Nasza obsługa klienta jest
            dostępna od poniedziałku do piątku w godzinach 7:00-18:00, oraz
            sobota-niedziela w godzinach 8:00-15:00. Oczekujemy na kontakt
            zwrotny!
        </p>
        <form>
            <span> numer </span>
            <span> email </span>

        </form>
    </div>
    <div class="map-container">
        <!-- svelte-ignore a11y-missing-attribute -->
        <iframe
   
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.334795627881!2d20.844818615719668!3d49.60930237936748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473de736088f9365%3A0x5e66b2ebd412ec1d!2sF.H.P.U.%20Adam%20Zwolenik!5e0!3m2!1sen!2spl!4v1609281000963!5m2!1sen!2spl"
          allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
</div>

<style>
.center {
    padding: 10px;
    border-radius: 25px; border: 6px solid #73AD21;
    display: flex;
    justify-content: space-around;
    margin-left: 20px;
    margin-right: 20px;
    width: 100%-40px; 
    height: auto; 
    padding: 20px;
}

.contact-form {
    border-radius: 25px;
     border: 6px 
    solid #73AD21;
    margin: 20px;
    width: 50%; 
    height: auto; 
    padding: 20px; 
    box-shadow: 0 0 10px rgba(0,0,0,0.1); 
    background-color: #fff; 
}

iframe {
    width: 100%;  
    height: 100%;  
    border-radius: 0%;  
  }
.map {
    width: 100%;
}

.map-container {
    overflow: hidden;  
    aspect-ratio: 1 / 1;
    border-radius: 25px;
    border: 6px  solid #73AD21;
    width: 50%;
    height: 400px; 
    margin: 20px;
  }

  @media only screen and (max-width: 600px) {
  .center {
    flex-direction: column; 
  }

  .contact-form {
    margin-left: auto;
    margin-right: auto;
    width: 100%; 
    margin-bottom: 20px; 
  }

  .map-container {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }
}

</style>
