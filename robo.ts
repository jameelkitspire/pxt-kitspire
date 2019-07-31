//% weight=115 color="#FFAB19" icon="K"
namespace Kitspire{
    export enum MotorDirection {
        //% block="Forward"
        Forward,
        //% block="Reverse"
        Reverse
    }

    export enum Motors {
        //%blockId=kitspire_A
        //% block="motor A"
        MotorA,
        //%blockId=kitspire_B
        //% block="motor B"
        MotorB
    }

    //% blockId=Kitspire_A
    //% block="%motor|Direction %dir|Speed %speed"
    //% speed.min=0 speed.max=100
    export function motorOn(motor: Motors, dir: MotorDirection, speed: number): void {
        let OutputVal = Math.clamp(0, 100, speed) * 10;

        switch (motor) {
            case Motors.MotorA: 
                switch (dir) {
                    case MotorDirection.Forward:
                        pins.analogWritePin(AnalogPin.P0, OutputVal);
                        pins.digitalWritePin(DigitalPin.P1, 0); 
                           break
                    case MotorDirection.Reverse:
                        pins.analogWritePin(AnalogPin.P1, OutputVal);
                        pins.digitalWritePin(DigitalPin.P0, 0);
                        break
                }

                break;
            case Motors.MotorB:
            switch (dir) {
                    case MotorDirection.Forward:
                        pins.analogWritePin(AnalogPin.P0, OutputVal);
                        pins.digitalWritePin(DigitalPin.P16, 0); 
                        break
                    case MotorDirection.Reverse:
                        pins.analogWritePin(AnalogPin.P16, OutputVal);
                        pins.digitalWritePin(DigitalPin.P0, 0);
                        break
                }

                break;
        }
    }
    //% blockId=kitspir_Off
    //%block="Turn off %motor"
    export function motorOff(motor: Motors): void {
        switch (motor) {
            case Motors.MotorA:
                pins.digitalWritePin(DigitalPin.P8, 0);
                pins.digitalWritePin(DigitalPin.P12, 0);
                break
            case Motors.MotorB:
                pins.digitalWritePin(DigitalPin.P0, 0);
                pins.digitalWritePin(DigitalPin.P16, 0);
                break
        }
    }

}
basic.forever(function () {
    Kitspire.motorOn(Kitspire.Motors.MotorA, Kitspire.MotorDirection.Forward, 100)
})


