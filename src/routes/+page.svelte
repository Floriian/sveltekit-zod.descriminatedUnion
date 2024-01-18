<script>
    import { superForm } from "sveltekit-superforms/client"

    export let data;

    const { enhance, form, errors } = superForm(data.superForm, { dataType: "json"}); 

    $: console.log($form)
    $: console.log('errors', $errors)

    let b = { first_name: '', last_name: '' }
    let isRequired = false;

    $: $form.doggo.isRequired ? $form.doggo.b = { first_name: b.first_name, last_name: b.last_name } : {};

    $: $form.doggo.isRequired = isRequired;

    $: console.log({ b })
</script>

<form use:enhance method="POST">
    <input type="text" bind:value={$form.doggo.a.first_name} id="a_firstname"/>
    <input type="text" bind:value={$form.doggo.a.last_name} id="a_lastname"/>

    <input type="checkbox" on:change={(e) => {
        isRequired = !isRequired;
    }} />

    {#if isRequired}
        <input type="text" id="b_firstname" bind:value={b.first_name} />
        <input type="text" id="b_lastname" bind:value={b.last_name} />
    {/if}
    
    <button type="submit">submit</button>
</form>