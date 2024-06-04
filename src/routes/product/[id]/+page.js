
export async function load({ params }){

    const response = await fetch(`http://localhost:8080/product/${params.id}`);

    const data = await response.json();
    console.log(data);

    return {data};
}