import { FC } from 'react';
import { transformSnakeCaseToTitleCase } from '@/libs/utils/transform-snake-case-title-case';

interface DetailsTableProps {
  data: any;
  className?: string
}

const DetailsTable: FC<DetailsTableProps> = ({ data, className }) => {
  return (
    <table className={`${className} table-fixed border-collapse border border-slate-500 w-full`}>
      <tbody>
        {Object.keys(data).filter(key => key !== 'url').map((key, index) => (
          <tr key={`${key}-${index}`}>
            <td className="border border-slate-600 px-3 py-1 bg-gray-700 font-bold w-1/3">
              {transformSnakeCaseToTitleCase(key)}
            </td>
            <td className="border border-slate-700 px-3 py-1 font-semibold">{data[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DetailsTable;
