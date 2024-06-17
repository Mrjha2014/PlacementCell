const jsonToCsv = (data, fields) => {
  // Create CSV header
  const header = fields.map((field) => `${field}`).join(", ") + "\n";

  // Create CSV rows
  const rows = data
    .map((row) => {
      return fields
        .map((field) => {
          const value = row[field];
          // Add space padding to columns if needed
          const paddedValue = value ? ` ${value} ` : " ";
          return `${paddedValue}`;
        })
        .join(", ");
    })
    .join("\n");

  return header + rows;
};

module.exports = { jsonToCsv };
