import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'floatToBr'
})
export class FloatToBrPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let nFormat = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        });

        value = nFormat.format(value);

        return value;
    }

}
