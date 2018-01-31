exports.CREATE_TABLE = function (options, driver) {
	var sql = "CREATE TABLE " + nameWithSchema(options, driver) + " (" + options.columns.join(", ");

	if (options.keys && options.keys.length > 0) {
		sql += ", PRIMARY KEY (" + options.keys.map(function (val) {
			return driver.query.escapeId(val);
		}).join(", ") + ")";
	}

	sql += ")";

	return sql;
};

exports.DROP_TABLE = function (options, driver) {
	var sql = "DROP TABLE " + nameWithSchema(options, driver);

	return sql;
};

exports.ALTER_TABLE_ADD_COLUMN = function (options, driver) {
	var sql = "ALTER TABLE " + nameWithSchema(options, driver) +
	          " ADD " + options.column;

	if (options.after) {
		sql += " AFTER " + driver.query.escapeId(options.after);
	} else if (options.first) {
		sql += " FIRST";
	}

	return sql;
};

exports.ALTER_TABLE_RENAME_COLUMN = function (opts, driver) {
	var eid = driver.query.escapeId;
	var sql = "ALTER TABLE "	+ nameWithSchema(options, driver) +
	          " RENAME COLUMN " + eid(opts.oldColName) + " TO " + eid(opts.newColName);

  return sql;
}

exports.ALTER_TABLE_MODIFY_COLUMN = function (options, driver) {
	var sql = "ALTER TABLE " + nameWithSchema(options, driver) +
	          " MODIFY " + options.column;

	return sql;
};

exports.ALTER_TABLE_DROP_COLUMN = function (options, driver) {
	var sql = "ALTER TABLE " + nameWithSchema(options, driver) +
	          " DROP " + driver.query.escapeId(options.column);

	return sql;
};

exports.CREATE_INDEX = function (options, driver) {
	var sql = "CREATE" + (options.unique ? " UNIQUE" : "") + " INDEX " + nameWithSchema(options, driver) +
	          " ON " + driver.query.escapeId(options.collection) +
	          " (" + options.columns.map(function (col) { return driver.query.escapeId(col); }) + ")";

	return sql;
};

exports.DROP_INDEX = function (options, driver) {
	var sql = "DROP INDEX " + nameWithSchema(options, driver) +
	          " ON " + driver.query.escapeId(options.collection);

	return sql;
};

function nameWithSchema(options, driver) {
	var name = driver.query.escapeId(options.name);
	if (driver.config.schema) {
		name = driver.query.escapeId(driver.config.schema) + "." + name;
	}
	return name;
}

//exports.RENAME_TABLE = function(options, driver) {
//  var sql = "ALTER TABLE " + options.oldCollectionName + " RENAME TO " + options.newCollectionName + " ;";
//}
