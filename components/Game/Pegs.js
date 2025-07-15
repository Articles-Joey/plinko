import Peg from './Peg';

const startHeight = 30;
const pegRows = 10;
const pegRowsSpacing = 4;

const Pegs = () => {
  const rows = Array.from({ length: pegRows }, (_, rowIndex) => rowIndex + 1);

  return (
    <group>
      {rows.map((rowIndex) => {
        
        const pegsInRow = Array.from({ length: rowIndex }, (_, columnIndex) => columnIndex + 1);

        return pegsInRow.map((columnIndex) => (
          <Peg
            key={`row${rowIndex}_col${columnIndex}`}
            position={[
              ( (0 - (columnIndex * pegRowsSpacing)) + (rowIndex * pegRowsSpacing) - (columnIndex * pegRowsSpacing) + 4),
              startHeight - rowIndex * pegRowsSpacing,
              2, // Adjust the spacing between pegs in the row
            ]}
          />
        ));
      })}
    </group>
  );
};

export default Pegs;