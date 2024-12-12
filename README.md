
<h1>Teste Outsera - Prêmio de Pior filme</h1>

.

<h2>Descrição do projeto</h2>

<p>O projeto consiste em obter o produtor com maior intervalo entre dois prêmios e o que obteve dois prêmios de forma mais rápida. O projeto é constituído por um arquivo .csv que é disponibilizado para execução do teste, o mesmo deve ser importado assim que a API é iniciada e os dados inseridos num banco de dados em memória.</p>

--
<p>OBS: Ao analisar os dados e fazer os primeiros testes, percebi que o retorno não estava adequado, sendo muito simples para a proposta do teste, já que somente 1 producer se repetia na estrutura atual e que os demais 'producers' se repetiam nos campos onde tinha mais de um producer por linha, sendo assim, "extrai" os mesmos da sua forma aglutinada e os separei para obter um melhor resultado.</p>
<br>

<h2>Rotas disponíveis</h2>

<ul>
<li>GET /worse_movies</li>
</ul>

<h2>Execução da aplicação</h2>

<h3>Com Docker:<h3>

<h4>Montar a imagem:</h4>
<p>"docker build -t teste-outsera ."</p>
<h4>Após o build da imagem:</h4>
<p>"docker run -d -p 3000:3000 teste-outsera"</p>
<p>Após isso a API estará disponível no endereço: http://localhost:3000/</p>


<h2>Execução dos testes</h2>

<ul>
<li>Dentro do docker, executar: npm test</li>
</ul>
