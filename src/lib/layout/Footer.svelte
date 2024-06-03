<script>
    import {
        Footer,
        FooterCopyright,
        FooterLinkGroup,
        FooterLink,
    } from "flowbite-svelte";
</script>

<div class="footer-p bg-lime-700">
    <Footer >
        <FooterCopyright ulClass="text-black"  href="/" by="Flowbite™" year={2022} />
        
        <div class="center">
            <FooterLinkGroup
            ulClass="flex flex-wrap items-center mt-3 text-sm text-black dark:text-gray-400 sm:mt-0"
        >
            <FooterLink href="/">About</FooterLink>
            <FooterLink href="/">Privacy Policy</FooterLink>
            <FooterLink href="/">Licensing</FooterLink>
            <FooterLink href="/">Contact</FooterLink>
         </FooterLinkGroup>  
           </div>

    </Footer>
</div>


<style>
.footer-p{
  
}

.center {
    padding: 10px;
   
    display: flex;
    justify-content: space-around; /* zmiana z 'block' na 'flex' i dodanie justowania */
    margin-left: 20px;
    margin-right: 20px;
    width: auto; /* zmiana z 1600px na 100% jeśli chcesz pełnej szerokości lub pozostaw 1600px jeśli taka jest wymagana szerokość */
    height: 450px; /* zmiana z 450px na 'auto' aby dopasować do zawartości */
    padding: 20px;
}
</style>