create table todos (
  id int auto_increment,
  content varchar(255) not null,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now(),
  completed_at timestamp null,
  primary key (id)
);
