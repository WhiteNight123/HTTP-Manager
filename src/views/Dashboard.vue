<template>
  <div class="project-details">
    <h2>{{ project.name }}</h2>
    <p>{{ project.description }}</p>
    <p>创建者: {{ project.creator }}</p>

    <h3>项目成员列表:</h3>
    <ul>
      <li v-for="member in project.members" :key="member">{{ member }}</li>
    </ul>

    <p>创建时间: {{ project.created_at }}</p>
    <p>接口数量: {{ project.interface_count }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {
        name: "示例项目",
        description: "这是一个示例项目的描述。",
        creator: "John Doe",
        members: ["Alice", "Bob", "Charlie"],
        created_at: "2023-08-20",
        interface_count: 10,
      },
    };
  },
};
</script>

<style>
.project-details {
  margin: 20px;
}
</style>
