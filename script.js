const tecnicosIniciales = [
    {
        id: 1,
        nombre: "Valentin Gonzales",
        especialidad: "Electricidad",
        ubicacion: "Ituzaingó",
        telefono: "11 2345-6789",
        descripcion: "Instalaciones eléctricas, reparaciones y mantenimiento.",
        foto: "valentin.png"
    },

    {
        id: 2,
        nombre: "Lucas Chebli",
        especialidad: "Reparación de PC",
        ubicacion: "Morón",
        telefono: "11 3456-7890",
        descripcion: "Reparación, mantenimiento y armado de computadoras.",
        foto: "lucas.png"
    },

    {
        id: 3,
        nombre: "Dante Bonfantino",
        especialidad: "Plomería",
        ubicacion: "Ituzaingó",
        telefono: "11 4567-8901",
        descripcion: "Reparaciones de cañerías, pérdidas y mantenimiento.",
        foto: "dante.png"
    },

    {
        id: 4,
        nombre: "Lautaro Di Lollo",
        especialidad: "Celulares",
        ubicacion: "Ituzaingó",
        telefono: "11 5678-9012",
        descripcion: "Reparación y mantenimiento de celulares.",
        foto: "dilollo.png"
    },

    {
        id: 5,
        nombre: "Flaco Lopez",
        especialidad: "Aire acondicionado",
        ubicacion: "Castelar",
        telefono: "11 6789-0123",
        descripcion: "Instalación, mantenimiento y reparación de aires.",
        foto: "flaco.png"
    }
];


// ==========================================
// CARGAR TÉCNICOS
// ==========================================

let tecnicosGuardados = JSON.parse(
    localStorage.getItem("tecnicosFixAR")
);


// Si ya había técnicos guardados,
// actualizamos los 5 técnicos iniciales
// pero mantenemos los que se registraron.

if (tecnicosGuardados && Array.isArray(tecnicosGuardados)) {

    tecnicosGuardados = tecnicosGuardados.map(tecnico => {

        const tecnicoInicial = tecnicosIniciales.find(
            t => t.id === tecnico.id
        );

        if (tecnicoInicial) {
            return {
                ...tecnicoInicial,
                ...tecnicoInicial
            };
        }

        return tecnico;
    });

    // Nos aseguramos de que estén los 5 iniciales
    tecnicosIniciales.forEach(tecnicoInicial => {

        const existe = tecnicosGuardados.some(
            tecnico => tecnico.id === tecnicoInicial.id
        );

        if (!existe) {
            tecnicosGuardados.push(tecnicoInicial);
        }

    });

} else {

    tecnicosGuardados = [...tecnicosIniciales];

}


// Guardamos los datos actualizados
localStorage.setItem(
    "tecnicosFixAR",
    JSON.stringify(tecnicosGuardados)
);


// Variable principal
let tecnicos = tecnicosGuardados;


// ==========================================
// MOSTRAR TÉCNICOS
// ==========================================

function mostrarTecnicos(lista) {

    const resultados = document.getElementById("resultados");
    const cantidad = document.getElementById("cantidadResultados");
    const sinResultados = document.getElementById("sinResultados");

    if (!resultados) return;

    resultados.innerHTML = "";


    if (lista.length === 0) {

        if (sinResultados) {
            sinResultados.style.display = "block";
        }

        if (cantidad) {
            cantidad.textContent = "0 técnicos";
        }

        return;
    }


    if (sinResultados) {
        sinResultados.style.display = "none";
    }


    if (cantidad) {
        cantidad.textContent =
            lista.length +
            (lista.length === 1 ? " técnico" : " técnicos");
    }


    lista.forEach(tecnico => {

        const tarjeta = document.createElement("article");

        tarjeta.className = "technician-card";


        const foto = tecnico.foto || "";


        tarjeta.innerHTML = `

            <div class="technician-icon">

                ${
                    foto
                    ? `<img
                        src="${foto}"
                        alt="Foto de ${tecnico.nombre}"
                        onerror="this.style.display='none'; this.parentElement.classList.add('sin-foto');"
                    >`
                    : ""
                }

                <span>
                    ${tecnico.nombre.charAt(0).toUpperCase()}
                </span>

            </div>


            <div class="technician-info">

                <h3>${tecnico.nombre}</h3>

                <span class="specialty">
                    ${tecnico.especialidad}
                </span>

                <p class="location">
                    📍 ${tecnico.ubicacion}
                </p>

                <p class="description">
                    ${tecnico.descripcion}
                </p>

                <button
                    class="profile-button"
                    onclick="verPerfil(${tecnico.id})"
                >
                    Ver perfil
                </button>

            </div>

        `;


        resultados.appendChild(tarjeta);

    });

}


// ==========================================
// BUSCAR TÉCNICOS
// ==========================================

function buscarTecnicos() {

    const input = document.getElementById("busqueda");

    if (!input) return;


    const texto = input.value.trim().toLowerCase();


    const filtrados = tecnicos.filter(tecnico => {

        return (

            tecnico.nombre.toLowerCase().includes(texto) ||

            tecnico.especialidad.toLowerCase().includes(texto) ||

            tecnico.ubicacion.toLowerCase().includes(texto) ||

            tecnico.descripcion.toLowerCase().includes(texto)

        );

    });


    mostrarTecnicos(filtrados);

}


// ==========================================
// BOTÓN BUSCAR
// ==========================================

const botonBuscar =
    document.getElementById("botonBuscar");


if (botonBuscar) {

    botonBuscar.addEventListener(
        "click",
        buscarTecnicos
    );

}


// ==========================================
// BUSCAR MIENTRAS ESCRIBÍS
// ==========================================

const campoBusqueda =
    document.getElementById("busqueda");


if (campoBusqueda) {

    campoBusqueda.addEventListener(
        "input",
        buscarTecnicos
    );

}


// ==========================================
// MOSTRAR TODOS AL ENTRAR
// ==========================================

if (document.getElementById("resultados")) {

    mostrarTecnicos(tecnicos);

}


// ==========================================
// ABRIR PERFIL
// ==========================================

function verPerfil(id) {

    window.open(
        "perfil.html?id=" + id,
        "_blank"
    );

}


// ==========================================
// CARGAR PERFIL
// ==========================================

function cargarPerfil() {

    const contenedor =
        document.getElementById("perfilTecnico");


    if (!contenedor) return;


    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const id =
        Number(parametros.get("id"));


    const tecnico =
        tecnicos.find(t => t.id === id);


    if (!tecnico) {

        contenedor.innerHTML = `

            <h2>Técnico no encontrado</h2>

            <a href="tecnicos.html">
                Volver a buscar
            </a>

        `;

        return;
    }


    const foto = tecnico.foto || "";


    contenedor.innerHTML = `

        <div class="perfil-avatar">

            ${
                foto
                ? `<img
                    src="${foto}"
                    alt="Foto de ${tecnico.nombre}"
                    onerror="this.style.display='none'; this.parentElement.classList.add('sin-foto-perfil');"
                >`
                : ""
            }

            <span>
                ${tecnico.nombre.charAt(0).toUpperCase()}
            </span>

        </div>


        <div class="perfil-info">

            <span class="hero-tag">
                Técnico FixAR
            </span>

            <h1>
                ${tecnico.nombre}
            </h1>

            <h3>
                ${tecnico.especialidad}
            </h3>

            <p class="perfil-location">
                📍 ${tecnico.ubicacion}
            </p>

            <p>
                ${tecnico.descripcion}
            </p>


            <div class="perfil-contacto">

                <strong>
                    Contacto
                </strong>

                <p>
                    📞 ${tecnico.telefono}
                </p>

            </div>


            <a
                href="tel:${tecnico.telefono}"
                class="main-button"
            >
                Contactar técnico
            </a>

        </div>

    `;

}


cargarPerfil();


// ==========================================
// REGISTRO DE TÉCNICO
// ==========================================

const formulario =
    document.getElementById("formRegistro");


if (formulario) {

    formulario.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nombre =
                document.getElementById("nombre")
                .value.trim();


            const especialidad =
                document.getElementById("especialidad")
                .value;


            const ubicacion =
                document.getElementById("ubicacion")
                .value.trim();


            const telefono =
                document.getElementById("telefono")
                .value.trim();


            const descripcion =
                document.getElementById("descripcion")
                .value.trim();


            const nuevoTecnico = {

                id: Date.now(),

                nombre: nombre,

                especialidad: especialidad,

                ubicacion: ubicacion,

                telefono: telefono,

                descripcion: descripcion,

                foto: ""

            };


            tecnicos.push(nuevoTecnico);


            localStorage.setItem(
                "tecnicosFixAR",
                JSON.stringify(tecnicos)
            );


            const mensaje =
                document.getElementById(
                    "mensajeRegistro"
                );


            if (mensaje) {

                mensaje.textContent =
                    "¡Perfil creado correctamente!";

                mensaje.classList.add(
                    "mensaje-exito"
                );

            }


            formulario.reset();

        }
    );

}