<?php
    require_once __DIR__ . '/../models/mPreguntasRespuestas.php';

    class CPreguntasRespuestas {
        /** @var string El nombre de la página actual. */
        public $nombrePagina;

        /** @var string La vista actual que se va a mostrar. */
        public $view;

        /** @var string|null El mensaje de estado o error después de realizar una operación. */
        public $mensaje;

        /** @var mCompeticiones Objeto de modelo de competiciones. */
        public $objModelo;

        /**
         * Constructor. Inicializa valores predeterminados y crea una instancia del modelo de preguntas y respuestas.
         */

        public function __construct() {
            $this->view = 'vListarCompeticiones';
            $this->nombrePagina ='';
            $this->objModelo = new MPreguntasRespuestas();
        }

        public function mostrarMenuPreguntasRespuestas(){
            $this->nombrePagina = 'Menu Preguntas y Respuestas';
            $this->view = 'vMenuPreguntasRespuestas';
        }

        public function mostrarFormPregunta(){
            $this->nombrePagina = 'Alta Pregunta';
            $this->view = 'vAltaPregunta';
        }
        
        public function listarPreguntas(){
            $this->view = 'vListarPreguntas';
            $this->nombrePagina = 'Listar Preguntas';
            $datos =  $this->objModelo->mListarPreguntas();
            return $datos;
        }
        
        public function borrarPregunta(){
            $id_pregunta = $_GET['id_pregunta'];
            $this->objModelo->mBorrarPregunta($id_pregunta);
        }

        public function procesarFormulario(){
            if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
                $texto_pregunta = $_POST['texto_pregunta'];
                $id_ambito = $_POST['ambito'];
                $texto_respuesta_correcta = $_POST['texto_respuesta_correcta'];
        
                // obtengo respuestas incorrectas dinámicamente
                $respuestas_incorrectas = [];
                $i = 1;
                while (isset($_POST['texto_respuesta_incorrecta' . $i])) {
                    $respuestas_incorrectas[] = $_POST['texto_respuesta_incorrecta' . $i];
                    $i++;
                }
        
                // construyo el array de respuestas iniciando con la correcta y luego las incorrectas
                $respuestas = ['1' => $texto_respuesta_correcta];
                
                foreach ($respuestas_incorrectas as $indice => $respuesta) {
                    $respuestas[$indice + 2] = $respuesta;
                }
        
                try {
                    // creo la pregunta y respuestas
                    $id_pregunta = $this->objModelo->crearPreguntaYRespuestas($texto_pregunta, $id_ambito, $respuestas);
                    
                    // redirecciono al formulario
                    header("Location: index.php?c=CPreguntasRespuestas&m=listarPreguntas");
                    exit();
                } catch (Exception $e) {
                    $codigoError = $e->getCode();
                    switch ($codigoError) {
                        case 1062:
                            echo "Error al procesar el formulario: Ya existe una pregunta similar.";
                            break;
                        case 1048:
                            echo "Error al procesar el formulario: No puede haber campos vacíos.";
                            break;
                        case 1406:
                            echo "Error al procesar el formulario: Los campos exceden la longitud máxima.";
                            break;
                        default:
                            echo "Error al procesar el formulario: Código de error " . $codigoError;
                    }
                }
            }
        }
        
        
        /* MODIFICACION*/

        public function mostrarModificarPregunta() {
            $id_pregunta = $_GET['id_pregunta'];

            $this->nombrePagina = 'Modificar Pregunta';
            $this->view = 'vModificarPregunta';
        
            $datos = $this->objModelo->obtenerPreguntaYRespuestas($id_pregunta);

            return $datos;
        }
        


    }
?>
