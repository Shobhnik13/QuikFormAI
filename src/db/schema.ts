import {
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	uuid,
	boolean,
	serial,
	pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { InferModel, relations } from "drizzle-orm";

export const formElements = pgEnum("field_type", [
	"RadioGroup",
	"Select",
	"Input",
	"Textarea",
	"Switch",
  ]);
  
export const users = pgTable("user", {
	id: text("id").notNull().primaryKey(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),

	username: text("username").unique(),
});

export type User = InferModel<typeof users>;

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccount["type"]>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey(account.provider, account.providerAccountId),
	})
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").notNull().primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey(vt.identifier, vt.token),
	})
);
export const threads = pgTable("thread", {
	id: uuid("id").defaultRandom().primaryKey(),
	text: text("text").notNull(),
	userId: text("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
	parentId: text("parent_id"),
	dialogue_id: uuid("dialogue_id"),
});


export type Thread = InferModel<typeof threads>;

export const threadsRelations = relations(threads, ({ one }) => ({
	user: one(users, {
		fields: [threads.userId],
		references: [users.id],
	}),
}));

export const userRelations = relations(users, ({ many }) => ({
	threads: many(threads),
}));


// schema designed by me



export const forms = pgTable("forms", {
	id: serial("id").primaryKey(),
	name: text("name"),
	description: text("description"),
	userId: text("user_id"),
	published: boolean("published"),
  });
  
  export const formsRelations = relations(
	forms,
	({ many, one }) => ({
	  questions: many(questions),
	  user: one(users, {
		fields: [forms.userId],
		references: [users.id],
	  })
	})
  );
  


  export const questions = pgTable("questions", {
	id: serial("id").primaryKey(),
	text: text("text"),
	fieldType: formElements("field_type"),
	formId: integer("form_id"),
  });
  
  
	export const fieldOptions = pgTable(
		"field_options",
		{
		  id: serial("id").primaryKey(),
		  text: text("text"),
		  value: text("value"),
		  questionId: integer("question_id"),
		}
	  );

	  export const questionsRelations =
	relations(
	  questions,
	  ({ one, many }) => ({
		form: one(forms, {
		  fields: [questions.formId],
		  references: [forms.id],
		}),
		fieldOptions: many(fieldOptions),
	
	  })
	);

	  export const fieldOptionsRelations =
		relations(
		  fieldOptions,
		  ({ one }) => ({
			question: one(questions, {
			  fields: [
				fieldOptions.questionId,
			  ],
			  references: [questions.id],
			}),
		  })
		);