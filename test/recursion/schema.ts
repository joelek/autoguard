// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import { guards as autoguard } from "../../";

export type array1 = string[];

export const array1 = autoguard.Array.of(autoguard.String);

export type array2 = string[][];

export const array2 = autoguard.Array.of(autoguard.Array.of(autoguard.String));

export type array3 = string[][][];

export const array3 = autoguard.Array.of(autoguard.Array.of(autoguard.Array.of(autoguard.String)));

export type array4 = string[][][][];

export const array4 = autoguard.Array.of(autoguard.Array.of(autoguard.Array.of(autoguard.Array.of(autoguard.String))));

export type array5 = string[][][][][];

export const array5 = autoguard.Array.of(autoguard.Array.of(autoguard.Array.of(autoguard.Array.of(autoguard.Array.of(autoguard.String)))));

export type intersection1 = {};

export const intersection1 = autoguard.Object.of<{}>({

});

export type intersection2 = {} & {};

export const intersection2 = autoguard.Intersection.of(
	autoguard.Object.of<{}>({

	}),
	autoguard.Object.of<{}>({

	})
);

export type intersection3 = {} & {} & {};

export const intersection3 = autoguard.Intersection.of(
	autoguard.Object.of<{}>({

	}),
	autoguard.Object.of<{}>({

	}),
	autoguard.Object.of<{}>({

	})
);

export type intersection4 = {} & {} & {} & {};

export const intersection4 = autoguard.Intersection.of(
	autoguard.Object.of<{}>({

	}),
	autoguard.Object.of<{}>({

	}),
	autoguard.Object.of<{}>({

	}),
	autoguard.Object.of<{}>({

	})
);

export type intersection5 = {} & {} & {} & {} & {};

export const intersection5 = autoguard.Intersection.of(
	autoguard.Object.of<{}>({

	}),
	autoguard.Object.of<{}>({

	}),
	autoguard.Object.of<{}>({

	}),
	autoguard.Object.of<{}>({

	}),
	autoguard.Object.of<{}>({

	})
);

export type union1 = string;

export const union1 = autoguard.String;

export type union2 = string;

export const union2 = autoguard.Union.of(
	autoguard.String
);

export type union3 = string;

export const union3 = autoguard.Union.of(
	autoguard.String
);

export type union4 = string;

export const union4 = autoguard.Union.of(
	autoguard.String
);

export type union5 = string;

export const union5 = autoguard.Union.of(
	autoguard.String
);

export type Autoguard = {
	"array1": array1,
	"array2": array2,
	"array3": array3,
	"array4": array4,
	"array5": array5,
	"intersection1": intersection1,
	"intersection2": intersection2,
	"intersection3": intersection3,
	"intersection4": intersection4,
	"intersection5": intersection5,
	"union1": union1,
	"union2": union2,
	"union3": union3,
	"union4": union4,
	"union5": union5
};

export const Autoguard = {
	"array1": array1,
	"array2": array2,
	"array3": array3,
	"array4": array4,
	"array5": array5,
	"intersection1": intersection1,
	"intersection2": intersection2,
	"intersection3": intersection3,
	"intersection4": intersection4,
	"intersection5": intersection5,
	"union1": union1,
	"union2": union2,
	"union3": union3,
	"union4": union4,
	"union5": union5
};
