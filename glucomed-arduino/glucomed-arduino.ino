


#define LEDpin 13
#define glucoSensor A0

int periodo = 4000;                             // Temporizador de encendido y apagado (en milisegundos)
int contadorNIR = 0;                            // Genera la onda del IR
int contadorSensor = 0;                         // Lee la salida del sensor
int numLecturas = 4;                            // Número de lecturas para el promedio ponderado
float pesoLecturas[] = { 0.4, 0.3, 0.2, 0.1 };  // Pesos para el promedio ponderado
int estadoLedNIR = 0;                           // 0-Apagado, 1-Encendido
unsigned long tiempoAnterior = 0;               // Guardar tiempo de referencia para comparaciones

int sumaLecturas = 0;
int lecturaSensor;

void setup() {
  Serial.begin(9600);
  pinMode(glucoSensor, INPUT);
  pinMode(LEDpin, OUTPUT);
}

bool detectarDedo() {
  int lectura = analogRead(glucoSensor);
  return lectura != 1;  // Retorna true si la lectura supera el umbral
}

void loop() {
  // if (detectarDedo()) {
  while (!detectarDedo()) {
    // Espera hasta que se detecte el dedo
  }
  tiempoAnterior = millis();

  while (millis() - tiempoAnterior <= periodo) {
    // Tu código de temporización aquí
  }

  // Leer el sensor y sumar ponderadamente
  sumaLecturas = 0;

  for (int i = 0; i < numLecturas; i++) {
    // int lecturaSensor = analogRead(glucoSensor);
    lecturaSensor = analogRead(glucoSensor);
    sumaLecturas += pesoLecturas[i] * lecturaSensor;
    // delay(10);  // Breve pausa entre lecturas
  }

  contadorSensor++;

  if (contadorSensor == numLecturas) {
    contadorSensor = 0;

    if (estadoLedNIR == 0) {
      digitalWrite(LEDpin, HIGH);
      estadoLedNIR = 1;
    } else {
      digitalWrite(LEDpin, LOW);
      estadoLedNIR = 0;

      // Mapear el valor ponderado a un rango personalizado
      int nivelGlucosa = map(sumaLecturas, 0, 1023 * numLecturas, 50, 250);

      // Serial.print("Nivel de glucosa: ");
      Serial.println(nivelGlucosa);

      sumaLecturas = 0;
      lecturaSensor = 0;
    }
  }
  // }
}





// #define LEDpin 2          //D2 LED NIR
// #define glucoseSensor A0  //A0 Salida Sensor glucómetro

// //Definir variables globales
// int periodo = 4;                   // periodo del temporizador encendido y apagado
// int contadorNIR = 0;               //generar la onda cuadrada del IR
// int contadorSensor = 0;            //leer salida del sensor
// int diferenciaMaxMin = 0;          //salida sensor
// int lecturaMaxima = 0;             //valor maximo
// int lecturaMinima = 1023;          //valor mínimo
// int lecturaSensor;                 // valor que lee a la salida del sensor
// int stateLEDNIR = 0;               //0 estado apagado, 1 estado encendido
// unsigned long tiempoAnterior = 0;  //guarda tiempo de referencia para comparar

// void setup() {
//   // Configurar puerto de salida
//   Serial.begin(9600);
//   while (!Serial);

//   // Definir altavoz,fotodiodo, LED NIR
//   // pinMode(ultrasoundPin, OUTPUT);
//   pinMode(LEDpin, OUTPUT);
//   pinMode(glucoseSensor, INPUT);
// }

// void loop() {
//   tiempoAnterior = millis();  //guarda el tiempo actual como referencia

//   while (millis() - tiempoAnterior <= periodo) {
//     //  digitalWrite (ultrasoundPin, LOW);
//     delayMicroseconds(12.5);
//     //  digitalWrite (ultrasoundPin, HIGH);
//     delayMicroseconds(12.5);
//     if (millis() - tiempoAnterior == 2) {
//       //  digitalWrite(ultrasoundPin, LOW);
//     }
//   }

//   //Almacenar los valores de la salida del sensor
//   lecturaSensor = analogRead(A0);
//   if (lecturaSensor > lecturaMaxima) {
//     lecturaMaxima = lecturaSensor;
//   }
//   if (lecturaSensor < lecturaMinima) {
//     lecturaMinima = lecturaSensor;
//   }

//   contadorNIR=contadorNIR+1;

//   // 125 veces*4ms=500ms encendido y 500 ms apagado
//   if (contadorNIR == 125) {
//     contadorNIR = 0;
//     if (stateLEDNIR == 0) {
//       digitalWrite(LEDpin, HIGH);
//       stateLEDNIR = 1;
//     } else {
//       digitalWrite(LEDpin, LOW);
//       stateLEDNIR = 0;
//       contadorSensor = contadorSensor + 1;
//       //cada 3 segundos se calcula la diferencia entre valores máximo y mínimo
//       if (contadorSensor == 3) {
//         contadorSensor = 0;
//         diferenciaMaxMin = lecturaMaxima - lecturaMinima;
//         lecturaMaxima = 0;
//         lecturaMinima = 1023;
//         float voltaje = (diferenciaMaxMin * 3.3) / 1023;
//         // Serial.print("Nivel de glucosa: ");
//         // Serial.print(diferenciaMaxMin);
//         // Serial.print(" mg/dl");
//         // Serial.print(" Voltaje: ");
//         // Serial.println(voltaje);

//         // Para calcular el mmol/l:

//         // Medida mg/dl x 0,0555= mmol/l

//         // EJEMPLO: 120 (mg/dl) x 0.0555 = 6.66 (mmol/l)

//         // Para calcular mg/dl:

//         // Medida mmol/l x 18,0182 = mg/dl

//         // EJEMPLO: 6.7 (mmol/l) x 18.0182 = 120.72 (mg/dl)

//           // Calcular la concentración de glucosa
//          float glucoseConcentration = 1000 / (1 + (log(10000 / voltaje) / log(10)));

//           // Mostrar los resultados
//           Serial.print("Nivel de glucosa: ");
//           Serial.print(glucoseConcentration);
//           Serial.println(" mg/dl ");

//       }
//     }
//   }
// }
